import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Form, Col, Container, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useHistory } from "react-router-dom";

import { ScoresContext } from "./../../context/ScoreContext";

export default function ScoreForm() {
  let { id } = useParams();
  console.log(id);
  let history = useHistory();

  let defaultValues = {
    id: "",
    title: "55",
    composer: "",
    style: "",
    instrumentation: [],
    stock: 0,
    owner: "",
  };
  const schema = yup.object().shape({
    title: yup.string().required(),
    composer: yup.string().required(),
    style: yup.string(),
    instrumentation: yup.string().required(),
    stock: yup.number().moreThan(-1),
    owner: yup.string(),
  });

  // const { isDirty, isValid, isSubmitting } = formState;

  //get the addScore function from the context
  const { addScore, updateScore, scores } = useContext(ScoresContext);

  let submitHandler = () => {};

  if (id) {
    //having an id means we are updating
    const scoreToBeUpdated = scores.find((score) => id === score.id); //find the score in the array in the context
    console.log(defaultValues);
    defaultValues = scoreToBeUpdated; // load the select score data in the inputs
    console.log(defaultValues);
    submitHandler = (data, e) => {
      console.log("data", data);
      data.id = id;
      data.instrumentation = [data.instrumentation];
      updateScore(id, data);
      history.push("/");
      console.log("data", data);
    };
  } else {
    submitHandler = (data, e) => {
      data.id = uuidv4();
      data.instrumentation = [data.instrumentation];
      addScore(data);
      reset(defaultValues);
      console.log("data", data, "evt", e);
    };
  }
  //https://react-hook-form.com/api#useForm
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });
  return (
    <Container>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Row>
          <Col>
            <Form.Group controlId="formTitle">
              {/* form group controlId will give the forms ID and do htmlFor in the label but no name */}
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                placeholder="Insert title..."
                ref={register}
                aria-invalid={errors.title ? "true" : "false"}
                className={errors.title ? "border-danger" : ""}
              />
              {/* Display a second label with the error if we get an error */}
              {errors.title && (
                <Form.Label role="alert" className="text-danger">
                  {errors.title?.message}
                </Form.Label>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formComposer">
              <Form.Label>Composer</Form.Label>
              <Form.Control
                name="composer"
                placeholder="Insert composer..."
                ref={register}
                aria-invalid={errors.composer ? "true" : "false"}
                className={errors.composer ? "border-danger" : ""}
              />
              {/* Display a second label with the error if we get an error */}
              {errors.composer && (
                <Form.Label role="alert" className="text-danger">
                  {errors.composer?.message}
                </Form.Label>
              )}
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="formStyle">
              {/* form group control ID will give the forms ID and do htmlFor in the label but no name */}
              <Form.Label>Style</Form.Label>
              <Form.Control
                name="style"
                placeholder="Insert style..."
                ref={register}
                aria-invalid={errors.style ? "true" : "false"}
                className={errors.style ? "border-danger" : ""}
              />
              {/* Display a second label with the error if we get an error */}
              {errors.style && (
                <Form.Label role="alert" className="text-danger">
                  {errors.style?.message}
                </Form.Label>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formInstrumentation">
              <Form.Label>Instrumentation</Form.Label>
              <Form.Control
                name="instrumentation"
                placeholder="Insert instrumentation..."
                ref={register}
                aria-invalid={errors.instrumentation ? "true" : "false"}
                className={errors.instrumentation ? "border-danger" : ""}
              />
              {/* Display a second label with the error if we get an error */}
              {errors.instrumentation && (
                <Form.Label role="alert" className="text-danger">
                  {errors.instrumentation?.message}
                </Form.Label>
              )}
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="formOwner">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                name="owner"
                placeholder="Insert owner..."
                ref={register}
                aria-invalid={errors.owner ? "true" : "false"}
                className={errors.owner ? "border-danger" : ""}
              />
              {/* Display a second label with the error if we get an error */}
              {errors.owner && (
                <Form.Label role="alert" className="text-danger">
                  {errors.owner?.message}
                </Form.Label>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                name="stock"
                placeholder="Insert stock..."
                ref={register}
                aria-invalid={errors.stock ? "true" : "false"}
                className={errors.stock ? "border-danger" : ""}
              />
              {/* Display a second label with the error if we get an error */}
              {errors.stock && (
                <Form.Label role="alert" className="text-danger">
                  {errors.stock?.message}
                </Form.Label>
              )}
            </Form.Group>
          </Col>
        </Form.Row>
        {/* <p>{`${!isValid && isDirty}`}</p>
        <p>Valid: {`${isValid}`}</p>
        <p>Dirty: {`${isDirty}`}</p>
        <p>Submitting: {`${isSubmitting}`}</p>
        <p>{JSON.stringify(errors)}</p> */}
        <Form.Row>
          <Col>
            <Button type="reset" onClick={reset} variant="secondary">
              Reset
            </Button>
          </Col>

          <Col>
            <Button
              type="submit"
              variant="primary"
              // disabled={isSubmitting || !(isValid && isDirty)}
            >
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
  // return (
  //   <form onSubmit={handleSubmit(submitHandler)}>
  //     <div className="form-row">
  //       <label htmlFor="name">Name</label>
  //       <input
  //         id="name"
  //         type="text"
  //         name="name"
  //         ref={register}
  //         aria-invalid={errors.name ? "true" : "false"}
  //       />
  //       {errors.name && (
  //         <label htmlFor="name" role="alert" className="error">
  //           {errors.name?.message}
  //         </label>
  //       )}
  //     </div>
  //     <div className="form-row">
  //       <label htmlFor="bhp" className="field-name">
  //         <abbr title="break horse power">B.H.P.</abbr>
  //       </label>
  //       <input
  //         id="bhp"
  //         type="text"
  //         name="bhp"
  //         ref={register}
  //         aria-invalid={errors.bhp ? "true" : "false"}
  //       />
  //       {errors.bhp && (
  //         <label htmlFor="bhp" role="alert" className="error">
  //           {errors.bhp?.message}
  //         </label>
  //       )}
  //     </div>
  //     <div className="form-row">
  //       <label htmlFor="avatar_url" className="field-name">
  //         Avatar URL
  //       </label>
  //       <input
  //         id="avatar_url"
  //         type="text"
  //         name="avatar_url"
  //         ref={register}
  //         aria-invalid={errors.avatar_url ? "true" : "false"}
  //       />
  //       {errors.avatar_url && (
  //         <label htmlFor="avatar_url" role="alert" className="error">
  //           {errors.avatar_url?.message}
  //         </label>
  //       )}
  //     </div>
  //     <div className="form-row controls">
  //       {/* <p>{`${!isValid && isDirty}`}</p>
  //     <p>Valid: {`${isValid}`}</p>
  //     <p>Dirty: {`${isDirty}`}</p>
  //     <p>Submitting: {`${isSubmitting}`}</p>
  //     <p>{JSON.stringify(errors)}</p> */}
  //       <button type="reset" onClick={reset}>
  //         Reset
  //       </button>
  //       <button type="submit" disabled={isSubmitting || !(isValid && isDirty)}>
  //         Submit
  //       </button>
  //     </div>
  //   </form>
  // );
}
