import "./Item.css";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

export default function Item(props) {
  const { data, deleteTask, editTask } = props;
  return (
    <div className="list-item">
      <p>{data.title}</p>
      <div>
        <BsTrash className="btn" onClick={() => deleteTask(data.id)} />
        <BiEdit className="btn" onClick={() => editTask(data.id)} />
      </div>
    </div>
  );
}
