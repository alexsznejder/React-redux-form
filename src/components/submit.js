import { SubmissionError } from "redux-form";

async function submitToSever(values) {
  try {
    let response = await fetch(
      "https://frosty-wood-6558.getsandbox.com/dishes",
      {
        method: "post",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

function submit(values) {
  if (!values.name)
    throw new SubmissionError({
      name: "Required!"
    });
  else if (!values.preparation_time)
    throw new SubmissionError({
      preparation_time: "Required!"
    });
  else if (!values.type)
    throw new SubmissionError({
      type: "Required!"
    });
  else if (values.type === "pizza") {
    if (!values.no_of_slices)
      throw new SubmissionError({
        no_of_slices: "Required!"
      });
    else if (!values.diameter)
      throw new SubmissionError({
        diameter: "Required!"
      });
  } else if (values.type === "soup") {
    if (!values.spiciness_scale)
      throw new SubmissionError({
        spiciness_scale: "Required!"
      });
    else if (values.spiciness_scale < 1 || values.spiciness_scale > 10)
      throw new SubmissionError({
        spiciness_scale: "The number must be an integer between 1 and 10!"
      });
  } else if (values.type === "sandwich") {
    if (!values.slices_of_bread)
      throw new SubmissionError({
        slices_of_bread: "Required!"
      });
    else if (values.slices_of_bread < 0 || values.slices_of_bread > 2)
      throw new SubmissionError({
        spiciness_scale: "The number must be an integer between 0 and 2!"
      });
  }
  submitToSever(values);
}

export default submit;
