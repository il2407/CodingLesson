import { React, useState, useEffect, useLayoutEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import ButtonList from "../components/ButtonList";
import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

const BASE_URL = "http://localhost:5001/";
const BASE_CODEBLOCK_URL = BASE_URL + "codeblocks";
const BASE_USER_URL = BASE_URL + "user";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CodeBlocksList(props) {
  return (
    <>
      <ButtonList
        modalData={props.items.codeblocks}
        field={props.field}
        modal={props.modal}
        data={props.userData.users}
        subject="Code Block"
      />
    </>
  );
}

export function CodeBlock() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [codeBlockDatabase, setBlockDataBase] = useState();
  const [userDatabase, setUserDatabase] = useState();

  const getAllcodeBlocks = async () => {
    const { data } = await axios.get(BASE_CODEBLOCK_URL);

    setBlockDataBase(data);
  };

  const getAllUsers = async () => {
    const { data } = await axios.get(BASE_USER_URL);
    setUserDatabase(data);
  };

  useEffect(() => {
    getAllcodeBlocks();
    getAllUsers();
  }, [codeBlockDatabase, userDatabase]);

  //Sending a POST request to submit a code block to database
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(BASE_CODEBLOCK_URL, {
      title: title,
      text: text,
    });
  };

  return (
    <div>
      <h1>Code Blocks Page</h1>
      <br></br>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs="auto" alignContent="baseline">
            <Item>
              <Form onSubmit={(e) => handleSubmit(e)}>
                {/* CodeBlock Title */}
                <FormGroup controlId="formBasicTitle">
                  <FormControl onChange={(e) => setTitle(e.target.value)}>
                    {" "}
                    <InputLabel htmlFor="my-input">Code Block Title</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                  </FormControl>
                </FormGroup>
                <br></br>

                {/* CodeBlock Code*/}
                <Form.Group controlId="formBasicText">
                  <FormControl onChange={(e) => setText(e.target.value)}>
                    {" "}
                    <InputLabel htmlFor="my-input">Code</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                  </FormControl>
                </Form.Group>

                {/* submit button */}
                <br></br>

                <Button
                  variant="success"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              </Form>
            </Item>
          </Grid>
          <Grid item xs="auto">
            <Item>
              {codeBlockDatabase && userDatabase && (
                <CodeBlocksList
                  field={"title"}
                  modal={true}
                  items={codeBlockDatabase}
                  userData={userDatabase}
                ></CodeBlocksList>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
