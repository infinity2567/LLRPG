import "./profileForm.css";
export function ProfileForm() {
  return (
    <>
      <h2>Profile Form</h2>
      <div>
        <form className="profileForm">
          <label>Name</label>
          <input name="name"></input>
          <label>Language</label>
          <input name="language"></input>
          <label>Level</label>
          <input name="level"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
