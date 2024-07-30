"use client";
import { useState, useRef } from "react";
import { storage, db } from "../../../Api/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import styles from "./styles.module.scss";

export default function AddMusic() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [musicName, setMusicName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleFile = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleArtistName = (e: any) => {
    setArtistName(e.target.value);
  };

  const handleMusicName = (e: any) => {
    setMusicName(e.target.value);
  };

  const handleImage = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const resetFields = () => {
    setFile(null);
    setImage(null);
    setMusicName("");
    setArtistName("");
    setProgress(0);
    setIsUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (!file || !image || !artistName || !musicName) {
      console.error("Preencha todos os campos necessários.");
      return;
    }

    setIsUploading(true);
    const imageRef = ref(storage, `images/${image.name}`);
    const uploadImageTask = uploadBytesResumable(imageRef, image);

    uploadImageTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.error("Erro ao enviar imagem:", error);
      },
      () => {
        getDownloadURL(uploadImageTask.snapshot.ref).then((imageURL) => {
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
                addDoc(collection(db, "Music"), {
                  fileName: file.name,
                  musicName: musicName,
                  artistName: artistName,
                  image: imageURL,
                  url: musicURL,
                })
                  .then(() => {
                    alert("Upload concluído");
                  })
                  .catch((error) => {
                    console.error("Erro ao escrever documento: ", error);
                  })
                  .finally(() => {
                    resetFields();
                  });
              });
            }
          );
        });
      }
    );
  };

  return (
    <div className={styles.modal}>
      <p>Arquivo da música</p>
      <input type="file" ref={fileInputRef} onChange={handleFile} />
      <hr />
      <input
        type="text"
        value={artistName}
        placeholder="Nome do artista"
        onChange={handleArtistName}
      />
      <input
        type="text"
        value={musicName}
        placeholder="Nome da música"
        onChange={handleMusicName}
      />
      <hr />
      <p>Imagem da música</p>
      <input type="file" ref={imageInputRef} onChange={handleImage} />
      <hr />
      <button
        className={styles.butonUpload}
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? "Enviando..." : "Upload"}
      </button>
      <hr />
      <p>Progresso do Upload da Música: {progress}%</p>
    </div>
  );
}
