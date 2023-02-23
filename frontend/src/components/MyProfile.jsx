import React, { useState, useEffect } from "react";
import RadioButton from "./RadioButton";
import "../styles/MyProfile.css";
import dataMyProfile from "../utils/dataMyProfile";
import { GetAllJobs } from "../utils/getAllJobs";
import { GetAllExperiences } from "../utils/getExperiences";
import { GetUser } from "../utils/getUsers";
import { UpdateUser, UpdateUserFile } from "../utils/updateUser";

const MyProfile = () => {
  const [jobs, setJobs] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState();

  const handleChange = (e, customValue) => {
    setMessage(null);
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: customValue ?? value,
    }));
  };

  const handleCV = (event) => {
    setUser({
      ...user,
      fileName: event.target.files[0].name,
      file: event.target.files[0],
    });
  };

  useEffect(() => {
    const getDatas = async () => {
      setJobs(await GetAllJobs());
      setExperiences(await GetAllExperiences());
      const data = window.localStorage.getItem("user");
      if (data) {
        const userParse = JSON.parse(data);
        setUser(await GetUser(userParse.id));
      }
    };
    getDatas();
  }, []);

  const updateUser = async () => {
    const formData = new FormData();
    formData.append("upload", user.file);
    formData.append("fileName", user.fileName);
    try {
      await UpdateUser(user);
      if (user.file.name) {
        await UpdateUserFile(user);
      }
      setMessage("Mise à jour effectuée avec succès");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="my_profile">
      <div className="my_profile_box_candidate">
        <div className="my_profile_title">
          <h3>Mon Profil</h3>
        </div>
        <form>
          <div className="my_profile_body">
            <div>
              <h3>Mes informations personnelles</h3>
              <div className="my_profile_informations_personnelles">
                <div className="my_profile_input_block">
                  <label htmlFor="firstname">Prénom</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="my_profile_small_input"
                    value={user.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="my_profile_input_block">
                  <label htmlFor="lastname">Nom</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="my_profile_small_input"
                    value={user.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="my_profile_input_block">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="my_profile_small_input"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="my_profile_input_block">
                  <label htmlFor="city">Localisation</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="my_profile_small_input"
                    value={user.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="my_profile_drop_cv">
                  <div>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      className="my_profile_inputfile"
                      accept="application/pdf"
                      onChange={handleCV}
                    />
                    <label htmlFor="file">Je dépose mon CV</label>
                  </div>
                </div>
                <div className="my_profyle_fileName">
                  {user.fileName && <p>{user.fileName}</p>}
                </div>
              </div>
            </div>
            <div>
              <h3>Ma situation actuelle </h3>
              <div className="my_profile_current_situation">
                <div className="my_profile_input_block">
                  <label htmlFor="job_id">Poste recherché </label>
                  <select
                    value={user.job_id}
                    name="job_id"
                    id="job_id"
                    className="my_profile_large_input"
                    onChange={handleChange}
                  >
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.job_title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="my_profile_label">Disponibilité</p>
                  <div className="my_profile_radio_buttons">
                    {dataMyProfile.radioButtons.disponibility.map((item) => (
                      <RadioButton
                        key={item.id}
                        labelName={item.labelName}
                        inputName="disponibilite"
                        inputValue={item.inputValue}
                      />
                    ))}
                  </div>
                </div>{" "}
                <div>
                  <p className="my_profile_label">Niveau d'expérience</p>
                  <div className="my_profile_radio_buttons">
                    {experiences.map((item) => {
                      return (
                        <RadioButton
                          key={item.id}
                          labelName={item.experience}
                          inputName="experience_id"
                          inputValue={item.id}
                          checked={item.experience_id === item.id}
                          onChange={handleChange}
                        />
                      );
                    })}
                  </div>{" "}
                </div>
                <div />
                <div className="my_profile_input_block">
                  <label htmlFor="actual_job">Poste actuel</label>
                  <input
                    type="text"
                    id="actual_job"
                    name="actual_job"
                    className="my_profile_small_input"
                    value={user.actual_job}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my_profile_current_situation_two">
                <div className="my_profile_input_block">
                  <label htmlFor="diploma">Niveau d'études</label>
                  <input
                    type="text"
                    id="diploma"
                    name="diploma"
                    className="my_profile_small_input"
                    value={user.diploma}
                    onChange={handleChange}
                  />
                </div>
                <div className="my_profile_input_block">
                  <label htmlFor="website">Mon site internet</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    className="my_profile_small_input"
                    value={user.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="my_profile_input_block">
                  <label htmlFor="salary">Salaire (annuel brut)</label>
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    className="my_profile_small_input"
                    value={user.salary}
                    onChange={handleChange}
                  />
                </div>

                <div className="my_profile_input_block">
                  <label htmlFor="github">Mon GitHub</label>
                  <input
                    type="text"
                    name="github"
                    id="github"
                    className="my_profile_small_input"
                    value={user.github}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p className="my_profile_label">
                    Reconnu travailleur handicapé
                  </p>
                  <div className="my_profile_radio_buttons">
                    {dataMyProfile.radioButtons.recognizedDisabledWorker.map(
                      (item) => (
                        <RadioButton
                          key={item.id}
                          labelName={item.labelName}
                          inputName="travailleur-handicape"
                          inputValue={item.inputValue}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="my_profile_actions">
              <button
                type="submit"
                className="my_profile_btn_enregistrer"
                onClick={updateUser}
              >
                Enregistrer
              </button>
              {message && <p>{message}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
