import React, { useState, useEffect } from "react";
import "./jwt-helper.css";
import { KJUR, b64utoutf8 } from "jsrsasign";

const JwtHelper = () => {
	const defaultPayload = JSON.stringify(
		{ sub: "1234567890", name: "John Doe", iat: 1516239022 },
		null,
		2
	);
	const defaultSecret = "your-256-bit-secret";

	const [payload, setPayload] = useState(defaultPayload);
	const [secret, setSecret] = useState(defaultSecret);
	const [algorithm, setAlgorithm] = useState("HS256");
	const [encoded, setEncoded] = useState("");
	const [decodedHeader, setDecodedHeader] = useState("");
	const [decodedPayload, setDecodedPayload] = useState("");
	const [decodedSignature, setDecodedSignature] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		encodeJWT();
	}, [payload, secret, algorithm]); // Encode JWT whenever these dependencies change

	useEffect(() => {
		if (encoded) decodeJWT(); // Decode JWT whenever the encoded value changes
	}, [encoded]);

	const encodeJWT = () => {
		try {
			const header = { alg: algorithm, typ: "JWT" };
			const token = KJUR.jws.JWS.sign(null, JSON.stringify(header), payload, secret);
			setEncoded(token);
			setError("");
		} catch (err) {
			setError("Encoding failed: " + err.message);
		}
	};

	const decodeJWT = () => {
		try {
			const isValid = KJUR.jws.JWS.verify(encoded, secret, { alg: [algorithm] });
			if (isValid) {
				const decodedToken = KJUR.jws.JWS.parse(encoded);
				setDecodedHeader(JSON.stringify(decodedToken.headerObj, null, 2));
				setDecodedPayload(JSON.stringify(decodedToken.payloadObj, null, 2));
				setDecodedSignature(decodedToken.sigHex);
				setError("");
			} else {
				setError("Verification failed: Invalid signature.");
			}
		} catch (err) {
			setError("Decoding failed: " + err.message);
		}
	};

	const handlePayloadChange = (e) => {
		setPayload(e.target.value);
	};

	const handleSecretChange = (e) => {
		setSecret(e.target.value);
	};

	const handleAlgorithmChange = (e) => {
		setAlgorithm(e.target.value);
	};

	return (
		<section className="tool-section jwt-helper-wrapper">
			<h3>JWT Helper</h3>
			<p>
				The JWT Helper is a convenient tool designed to facilitate the encoding and decoding of JSON
				Web Tokens (JWTs). You can easily generate a JWT by providing a payload and a secret key, or
				decode an existing JWT to verify its contents and signature. This tool is intended to assist
				developers in testing and debugging JWTs during the development of secure applications.
			</p>

			<div className="jwt-helper-algorithm-selector">
				<label>Algorithm</label>
				<select value={algorithm} onChange={handleAlgorithmChange}>
					<option value="HS256">HS256</option>
					<option value="HS384">HS384</option>
					<option value="HS512">HS512</option>
				</select>
			</div>
			<div className="jwt-container">
				<article className="jwt-helper-encoded">
					<h4>Encoded</h4>
					<div className="jwt-helper-encoded-content">
						<textarea value={encoded} readOnly />
					</div>
				</article>
				<article className="jwt-helper-decoded">
					<h4>Decoded</h4>
					<div className="jwt-helper-decoded-content">
						<div className="jwt-helper-decoded-header">
							<h5>HEADER</h5>
							<textarea value={decodedHeader} readOnly />
						</div>
						<div className="jwt-helper-decoded-payload">
							<h5>PAYLOAD</h5>
							<textarea value={decodedPayload} readOnly />
						</div>
						<div className="jwt-helper-decoded-verify-signature">
							<h5>VERIFY SIGNATURE</h5>
							<textarea value={decodedSignature} readOnly />
						</div>
					</div>
				</article>
			</div>
			<div className="jwt-helper-footer">{error && <p className="error">{error}</p>}</div>
		</section>
	);
};

export default JwtHelper;
