import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import maleIcon from "../../assets/images/male.png";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  title: string;
  company: string;
  description: string;
  location: string;
  salary: string;
  deadline: Date;
  experience: string;
};

const CreatePost: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      title,
      company,
      description,
      location,
      salary,
      deadline,
      experience,
    } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/post/createpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          title: title,
          company: company,
          description: description,
          location: location,
          salary: salary,
          deadline: deadline,
          experience: experience,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Posting job failed");
      }
      setShowModal(false);
      alert("Job posted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Posting job failed:", error);
      alert("Failed to post job!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#ffffff",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <div style={{ marginRight: "16px" }}>
        <img src={maleIcon} alt="icon" className="h-12 w-12" />
      </div>
      <div
        style={{
          background: "#f0f0f0",
          borderRadius: "30px",
          padding: "15px 300px",
          cursor: "pointer",
          border: "1px solid black",
        }}
        onClick={() => setShowModal(true)}
      >
        Post a job
      </div>
      {showModal && (
        <div
          style={{
            position: "fixed",
            zIndex: 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "50%",
              border: "1px solid black",
            }}
            className="bg-gradient-to-r from-purple-500 to-indigo-500"
          >
            <span
              style={{
                float: "right",
                cursor: "pointer",
                fontSize: "24px",
              }}
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2
              style={{
                marginBottom: "5px",
                color: "white",
                fontSize: "30px",
                textAlign: "center",
              }}
            >
              Post job
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <label
                htmlFor="title"
                style={{ marginBottom: "8px", color: "white" }}
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: true })}
                style={{ marginBottom: "8px", padding: "8px" }}
                required
              />
              <label
                htmlFor="company"
                style={{ marginBottom: "8px", color: "white" }}
              >
                Company:
              </label>
              <input
                type="text"
                id="company"
                {...register("company", { required: true })}
                style={{ marginBottom: "8px", padding: "8px" }}
                required
              />

              <label
                htmlFor="description"
                style={{ marginBottom: "8px", color: "white" }}
              >
                Description:
              </label>
              <input
                type="text"
                id="description"
                {...register("description", { required: true })}
                style={{ marginBottom: "8px", padding: "8px" }}
                required
              />

              <label
                htmlFor="location"
                style={{ marginBottom: "8px", color: "white" }}
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                {...register("location", { required: true })}
                style={{ marginBottom: "8px", padding: "8px" }}
                required
              />
              <label
                htmlFor="salary"
                style={{ marginBottom: "8px", color: "white" }}
              >
                Salary:
              </label>
              <input
                type="text"
                id="salary"
                {...register("salary", { required: true })}
                style={{ marginBottom: "8px", padding: "8px" }}
                required
              />
              <label
                htmlFor="deadline"
                style={{ marginBottom: "8px", color: "white" }}
              >
                Deadline:
              </label>
              <input
                type="date"
                id="deadline"
                {...register("deadline", { required: true })}
                style={{ marginBottom: "8px", padding: "8px" }}
                min={new Date().toISOString().split("T")[0]}
                required
              />
              <label
                htmlFor="experience"
                style={{ marginBottom: "8px", color: "white" }}
              >
                Experience:
              </label>
              <input
                type="text"
                id="experience"
                {...register("experience", { required: true })}
                style={{ marginBottom: "8px", padding: "8px" }}
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-600 to-red-600"
                style={{
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
