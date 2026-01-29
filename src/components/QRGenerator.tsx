import React, { useState } from 'react';
import QRCodeStyling from "qr-code-styling";
import "./QRStyles.css";

const QRGenerator: React.FC = () => {
    const [data, setData] = useState<string>("");

    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: "default",
        dotsOptions: {
            color: "black",
            type: "rounded"
    });