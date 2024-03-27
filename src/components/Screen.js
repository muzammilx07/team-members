import React, { useEffect, useReducer, useState } from "react";
import "./screen.css";
import EmployeeData from "./EmployeeData";

const ADD_TO_PROJECT = "addToProject";
const REMOVE_FROM_PROJECT = "removeFromProject";

function quantityReducer(state, action) {
  const { productId } = action;
  switch (action.type) {
    case ADD_TO_PROJECT:
      return { ...state, [productId]: (state[productId] || 0) + 1 };
    case REMOVE_FROM_PROJECT:
      return {
        ...state,
        [productId]: Math.max(0, (state[productId] || 0) - 1),
      };
    default:
      return state;
  }
}

const Screen = () => {
  const [projectMemberQuantities, dispatch] = useReducer(quantityReducer, {});
  const [projectMembers, setProjectMembers] = useState([]);

  const addToProject = (employee) => {
    setProjectMembers([...projectMembers, employee]);
    dispatch({ type: ADD_TO_PROJECT, productId: employee.id });
  };

  const removeFromProject = (employee) => {
    const updatedProjectMembers = projectMembers.filter(
      (member) => member.id !== employee.id
    );
    setProjectMembers(updatedProjectMembers);
    dispatch({ type: REMOVE_FROM_PROJECT, productId: employee.id });
  };

  const calculateAverageProjectAge = () => {
    if (projectMembers.length === 0) return 0;
    const totalAge = projectMembers.reduce((acc, member) => acc + member.age, 0);
    return totalAge / projectMembers.length;
  };

  const sortProjectByAge = () => {
    const sortedProject = [...projectMembers].sort((a, b) => a.age - b.age);
    setProjectMembers(sortedProject);
  };

  return (
    <div className="main">
      <div className="products">
        <div className="titlediv">
          <h1 className="title">Products</h1>
        </div>
        <div className="employeelist">
          {EmployeeData.map((employee) => (
            <div
              className={`productdiv ${projectMemberQuantities[employee.id] > 0 &&
                "disabled"}`}
              key={employee.id}
            >
              <p>
                Name: {employee.first_name} {employee.last_name}
              </p>
              <p>Age: {employee.age}</p>
              {!projectMembers.find((member) => member.id === employee.id) ? (
                <button className="button-7" onClick={() => addToProject(employee)}>Add</button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="cart">
        <div className="titlediv">
          <h1 className="title">Project Members</h1>
          <button onClick={sortProjectByAge}>Sort by Age</button>
          <p>Average Age: {calculateAverageProjectAge()}</p>
        </div>
        {projectMembers.map((member) => (
          <div className="productdiv" key={member.id}>
            <p>
              Name: {member.first_name} {member.last_name}
            </p>
            <p>Age: {member.age}</p>
            <button onClick={() => removeFromProject(member)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen;
