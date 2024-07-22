"use client";
import { useState } from "react";
import { storage, db } from "./Api/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [musicName, setMusicName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageProgress, setImageProgress] = useState(0);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleArtistName = (e) => {
    setArtistName(e.target.value);
  };

  const handleMusicName = (e) => {
    setMusicName(e.target.value);
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file || !image || !artistName || !musicName) {
      console.error("Preencha todos os campos necessários.");
      return;
    }

    // Upload da imagem
    const imageRef = ref(storage, `images/${image.name}`);
    const uploadImageTask = uploadBytesResumable(imageRef, image);

    uploadImageTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImageProgress(progress);
      },
      (error) => {
        console.error("Erro ao enviar imagem:", error);
      },
      () => {
        getDownloadURL(uploadImageTask.snapshot.ref).then((imageURL) => {
          // Upload do arquivo de música
          const storageRef = ref(storage, `audio/${file.name}`);
          const uploadMusicTask = uploadBytesResumable(storageRef, file);

          uploadMusicTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            (error) => {
              console.error("Erro ao enviar música:", error);
            },
            () => {
              getDownloadURL(uploadMusicTask.snapshot.ref).then((musicURL) => {
                // Adicionar informações ao Firestore
                addDoc(collection(db, "Music"), {
                  fileName: file.name,
                  musicName: musicName,
                  artistName: artistName,
                  image: imageURL,
                  url: musicURL,
                })
                  .then(() => {
                    console.log("Documento adicionado com sucesso!");
                  })
                  .catch((error) => {
                    console.error("Erro ao escrever documento: ", error);
                  });
              });
            }
          );
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFile} />
      <input
        type="text"
        placeholder="Nome do artista"
        onChange={handleArtistName}
      />
      <input
        type="text"
        placeholder="Nome da música"
        onChange={handleMusicName}
      />
      <input
        type="file"
        placeholder="Imagem da música"
        onChange={handleImage}
        style={{
          border: "2px solid red",
        }}
      />
      <button onClick={handleUpload}>Upload</button>
      <div>Progresso do Upload da Imagem: {imageProgress}%</div>
      <div>Progresso do Upload da Música: {progress}%</div>
    </div>
  );
}
