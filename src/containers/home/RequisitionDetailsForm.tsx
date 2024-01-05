import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { ActiveTab, updateValue } from "@src/slices/FormHelperSlice";

const RequisitionDetailsForm: React.FC = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.FormHelper);
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: store?.requisitionTitle || "",
      noOfOpenings: store?.noOfOpenings || 0,
      urgency:
        urgencyOptions.filter((val) => val.label == store?.urgency)[0]?.value ||
        "",
      gender:
        genderOptions.filter((val) => val.label == store?.gender)[0]?.value ||
        "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      //  Go to Next Step
      dispatch(ActiveTab(1));
    },
  });

  useEffect(() => {
    dispatch(
      updateValue([
        {
          name: "requisitionTitle",
          value: values.requisitionTitle,
        },
        {
          name: "noOfOpenings",
          value: values.noOfOpenings,
        },
        {
          name: "gender",
          value: genderOptions.filter((val) => val.value == values.gender)[0]
            ?.label,
        },
        {
          name: "urgency",
          value: urgencyOptions[values?.urgency]?.label,
        },
      ])
    );
  }, [values]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" onClick={handleSubmit as any} type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
