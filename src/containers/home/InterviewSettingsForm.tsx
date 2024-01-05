import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Flex, Box } from "@chakra-ui/react";
import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { ActiveTab, updateValue } from "@src/slices/FormHelperSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";

const InterviewDetailsForm: React.FC = () => {
  const dispatch = useDispatch();
  const store = useSelector((store: RootState) => store.FormHelper);

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode:
        interviewModeOptions.find((val) => val.label === store?.interviewMode)
          ?.value || "",
      interviewDuration:
        interviewDurationOptions.find(
          (val) => val.label === store?.interviewDuration
        )?.value || "",
      interviewLanguage:
        interviewLanguageOptions.find(
          (val) => val.label === store?.interviewLanguage
        )?.value || "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required(
        "Interview Duration is required"
      ),
      interviewLanguage: Yup.string().required(
        "Interview Language is required"
      ),
    }),
    onSubmit: (values) => {
      console.log(store);
      alert("Form successfully submitted");
    },
  });

  useEffect(() => {
  dispatch(
    updateValue([
      {
        name: "interviewMode",
        value:
          (interviewModeOptions.find(
            (val) => val.value === values.interviewMode
          )?.label as string) || "",
      },
      {
        name: "interviewDuration",
        value:
          (interviewDurationOptions.find(
            (val) => val.value === values.interviewDuration
          )?.label as string) || "",
      },
      {
        name: "interviewLanguage",
        value:
          (interviewLanguageOptions.find(
            (val) => val.value === values.interviewLanguage
          )?.label as string) || "",
      },
    ])
  );

  }, [values]);

  const prevTab = () => {
    dispatch(ActiveTab(1));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" onClick={prevTab} type="button">
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
