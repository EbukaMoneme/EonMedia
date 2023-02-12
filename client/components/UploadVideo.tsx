import {
  Button,
  Group,
  Modal,
  Progress,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { RiVideoUploadLine } from "react-icons/ri";
import { useStyles } from "./Styles";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { HiUpload } from "react-icons/hi";
import { useMutation } from "react-query";
import { updateVideo, uploadVideo } from "@/api";
import { useForm } from "@mantine/form";
import { Video } from "@/types";
import { AxiosError, AxiosResponse } from "axios";

const EditVideoForm = ({
  videoId,
  setOpened,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: true,
    },
  });

  const mutation = useMutation<
    AxiosResponse<Video>,
    AxiosError,
    Parameters<typeof updateVideo>["0"]
  >(updateVideo, {
    onSuccess: () => {
      setOpened(false);
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        mutation.mutate({ videoId, ...values })
      )}
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

        <Switch
          label="Published"
          {...form.getInputProps("published")}
          // style={{ cursor: "pointer" }}
        />

        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};

export const UploadVideo = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  const mutation = useMutation(uploadVideo, {
    onSuccess: (data) => {
      console.log("LOOK HERE", data);
      // return data;
    },
  });
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
    mutation.mutate({ formData, config });
  };
  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title="Upload video"
        size="xl"
      >
        {progress === 0 && (
          <Dropzone
            onDrop={(files) => {
              upload(files);
            }}
            accept={{ video: [MIME_TYPES.mp4, "video/mov", "video/quicktime"] }}
            multiple={false}
          >
            {/* {(status) => {
            return (
            )
          }} */}
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
        {progress > 0 && (
          <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
        )}

        {mutation.data && (
          <EditVideoForm
            videoId={mutation.data.videoId}
            setOpened={setOpened}
          />
        )}
      </Modal>

      <Button className={classes.button} mr={5} onClick={() => setOpened(true)}>
        <RiVideoUploadLine className={classes.buttonIcon} />
        Create
      </Button>
    </>
  );
};
