import {
  Button,
  Group,
  Modal,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RiVideoUploadLine } from "react-icons/ri";
import { useStyles } from "./Styles";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { HiUpload } from "react-icons/hi";
import { useMutation } from "react-query";
import { updateVideo, uploadVideo } from "@/api";
import { useForm } from "@mantine/form";
import { Video } from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import { useVideo } from "@/context/video";
import { BsCheck2Circle } from "react-icons/bs";
import generateVideoThumbnail from "@/helpers/generateVideoThumbnail";

/**
 * Form for updating video fields (title, description, and thumbnail)
 */
const EditVideoForm = ({
  thumbnail,
  videoId,
  setOpened,
}: {
  thumbnail: any;
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const { refetch } = useVideo();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: true,
      thumbnail: JSON.stringify(thumbnail),
    },
  });

  const mutation = useMutation<
    AxiosResponse<Video>,
    AxiosError,
    Parameters<typeof updateVideo>["0"]
  >(updateVideo, {
    onSuccess: () => {
      setOpened(false);
      refetch();
      form.reset();
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        mutation.mutate({ videoId, ...values });
      })}
    >
      <Stack>
        <TextInput
          label="Title"
          required
          placeholder="Title"
          {...form.getInputProps("title")}
        ></TextInput>

        <TextInput
          label="Description"
          required
          placeholder="Describe your video"
          {...form.getInputProps("description")}
        ></TextInput>
        <Switch label="Published" {...form.getInputProps("published")} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};

/**
 * Form to upload video
 */
export const UploadVideo = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<any>();

  const mutation = useMutation(uploadVideo);
  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      setProgress(percent);
    },
  };

  const upload = (files: File[]) => {
    const formData = new FormData();
    formData.append("video", files[0]);
    setFile(files[0]);
    mutation.mutate({ formData, config });
  };

  useEffect(() => {
    if (file) {
      // Generates thumbnail image/buffer
      const thumbnailImage = async (file: File) => {
        const thumbnail = await generateVideoThumbnail(file);

        const buff = Buffer.from((thumbnail as string).split(",")[1], "base64");
        setThumbnail(buff);
      };

      thumbnailImage(file);
    }
  }, [file]);

  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        onClose={() => {
          setOpened(false);
          setProgress(0);
          mutation.reset();
        }}
        title="Upload video"
        size="xl"
      >
        {!mutation.data && (
          <Dropzone
            onDrop={(files) => {
              upload(files);
            }}
            // Only accepts mp4 unfortunately, further implementation would expand input types
            accept={{ video: [MIME_TYPES.mp4, "video/mov", "video/quicktime"] }}
            multiple={false}
          >
            <Group
              position="center"
              spacing="xl"
              style={{
                minHeight: "50vh",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <HiUpload className={classes.uploadIcon} />
              <Text>Drag and drop your video or click to select file</Text>
            </Group>
          </Dropzone>
        )}

        {mutation.data && (
          <EditVideoForm
            videoId={mutation.data.videoId}
            thumbnail={thumbnail}
            setOpened={setOpened}
          />
        )}

        {progress > 0 && (
          <div style={{ marginTop: "15px" }}>
            {progress < 100 ? (
              <div>Uploading {progress}% ...</div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <BsCheck2Circle
                  style={{ marginRight: "5px", color: "green" }}
                />{" "}
                Upload complete.
              </div>
            )}
          </div>
        )}
      </Modal>

      <Button className={classes.button} mr={5} onClick={() => setOpened(true)}>
        <RiVideoUploadLine className={classes.buttonIcon} />
        <span className={classes.buttonText}>Create</span>
      </Button>
    </>
  );
};
