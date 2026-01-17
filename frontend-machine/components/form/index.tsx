const SUBMIT_URL =
  "https://questions.greatfrontend.com/api/questions/contact-form";
export default function Form() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;

    try {
      if (form.action != SUBMIT_URL) {
        alert("Incorrect action");
        return;
      }
      if (form.method.toLowerCase() !== "post") {
        alert("Incorrect form method value");
        return;
      }

      const formData = new FormData(form);
      // why made it so ?
      const response = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Not working");
      }
    } catch (err: any) {
      alert(`Error in Submittomg form ${err.message}`);
    }
  };
  return (
    <>
      <div className="bg-white h-dvh w-dvw flex items-center justify-center">
        <form
          action="https://questions.greatfrontend.com/api/questions/contact-form"
          method="post"
          onSubmit={handleSubmit}
          className="text-black flex flex-col items-center gap-4 justify-center text-[20px]"
        >
          <div className=" p-3 rounded-xl ">
            <label className="text-amber-300" htmlFor="name-input">
              Name
            </label>
            <input
              className="rounded-xl block border p-1 max-w-62.5  border-black"
              id="name-input"
              name="name"
              type="text"
            />
          </div>

          <div>
            <label className="" htmlFor="email-input">
              Email
            </label>
            <input
              className="rounded-xl block border p-1 max-w-62.5  border-black"
              id="email-input"
            ></input>
          </div>

          <div className="bg-red-500">
            <label htmlFor="message-input">Message</label>
            <textarea
              className="rounded-xl block border p-1 border-black w-62.5 "
              id="message-input"
              name="message"
            ></textarea>
          </div>
          <button className="bg-black text-white rounded-xl py-4 px-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
