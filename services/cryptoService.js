import crypto from "crypto";

export const decryptAESGCM = ({ iv, ciphertext, tag, keyBase64 }) => {

    if (!iv || !ciphertext || !tag || !keyBase64) {
        throw new Error("Parameter decrypt tidak lengkap");
    }

    const key = Buffer.from(keyBase64, "base64");

    const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        key,
        Buffer.from(iv, "base64")
    );

    decipher.setAuthTag(Buffer.from(tag, "base64"));

    let decrypted = decipher.update(ciphertext, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
};
