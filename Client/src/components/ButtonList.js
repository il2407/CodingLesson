import ModalDialog from "./ModalDialog";
import NaviButton from "./NaviButton";
import { List } from "@mui/material";

// Custom component that gets:
// Data of the names of the buttons in the list
// field of the exact data that you want to be on the button
// Modal which is a boolean argument to set if it's a modal button or not
// Path of the button to navigate to
// ModalData of the names of the modal buttons in the list
// Subject for the headline of the list

function ButtonList({ data, field, modal, path, modalData, subject }) {
  const currdata = data;
  modal ? (data = modalData) : (data = data);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      <ul className="list-items">
        <h4>Choose {subject} </h4>
        <br></br>
        {/* Dynamic list based on code Block Database */}
        {data.map((item) => (
          <li key={item._id}>
            {
              //In case it's a modal button list
              modal ? (
                <ModalDialog
                  name={item[field]}
                  modalData={currdata}
                  subject="User"
                ></ModalDialog>
              ) : (
                //In case it's a Navigation button list
                <NaviButton name={item[field]} path={path}></NaviButton>
              )
            }
          </li>
        ))}
      </ul>
    </List>
  );
}

export default ButtonList;
