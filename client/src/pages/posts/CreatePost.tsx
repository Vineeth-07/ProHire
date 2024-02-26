import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import maleIcon from "../../assets/images/male.png";
import femaleIcon from "../../assets/images/female.png";
import { postJobData } from "../../api/PostApi";
import { fetchUserData } from "../../api/UserApi";
import { UserData } from "../../api/UserApi";

interface Inputs {
  title: string;
  company: string;
  description: string;
  location: string;
  salary: string;
  deadline: Date;
  experience: string;
  applications: string;
}

const CreatePost: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(true);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await postJobData(data, localStorage.getItem("authToken"));
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      alert("Failed to post job!");
    }
  };

  useEffect(() => {
    userApi();
  }, []);

  const userApi = async () => {
    try {
      const data = await fetchUserData();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const user = Object.values(userData)[0];

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
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <img
                src={user.gender === "male" ? maleIcon : femaleIcon}
                alt="icon"
                className="h-12 w-12"
              />
            </>
          )}
        </div>
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
