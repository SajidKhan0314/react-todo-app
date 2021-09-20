import classes from "./CustomCheckbox.module.scss";

const CustomCheckbox = (props) => {
  return (
    <label className={classes.Checkbox}>
      <input type="checkbox" checked={props.checked} onChange={props.changed} />
      <span className={classes.Checkmark}></span>
    </label>
  );
};

export default CustomCheckbox;
