import React, { useState, useContext } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import styles from "../css/RequestForm.module.css"
import UserContext from "../UserProvider";
import { useNavigate } from 'react-router-dom';

export default function RequestForm() {
    const navigate = useNavigate();
    const phoneRegex = "[0-9 +]+";
    const { calculatorData } = useContext(UserContext);

    const defaultForm = {
        applicantType: "",
        name: "",
        surname: "",
        birthNum: "",
        nationality: "",
        email: "",
        phone: "+420",
        IC: "",
        position: "",
        companyName: "",
        amount: calculatorData.amount,
        numOfMonths: calculatorData.numOfMonths,
        address: {
            street: "",
            descNumber: "",
            indicativeNumber: "",
            city: "",
            postalCode: ""
        }
    }

    const [formData, setFormData] = useState(defaultForm)
    const [validated, setValidated] = useState(false);
    const [applicantType, setApplicantType] = useState("")
    const [requestAddCall, setRequestAddCall] = useState({
        state: "inactive",
    })

    const setInputField = (key, value) => {
        const newData = {...formData};
        newData[key] = value.trim();

        return setFormData(newData);
    }

    const setAddressInputField = (key, value) => {
        const newData = {...formData};
        newData.address[key] = value;

        return setFormData(newData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        /* formData.phone.replaceAll(' ', ''); */

        const form = e.currentTarget;

        if (!form.checkValidity()) {
            setValidated(true);
        }

        console.log(formData);

        setRequestAddCall({ state: "pending" });
        fetch("/request/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then(async (response) => {
            const responseJson = await response.json();
            console.log(responseJson);
            if (response.status >= 400) {
                setRequestAddCall({ state: "error", error: responseJson});
            } else {
                setRequestAddCall({ state: "success", data: responseJson});
            }
        });

        
    }

  return (
    <div>
        <header>
            <h2>Formulář k žádosti o půjčku</h2>
        </header>
        <Form 
            className={styles.form}
            validated={validated}
            noValidate onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.inputSection}>
                <h3>1</h3>
            </div>
            <h4>Typ subjektu</h4>
            <Form.Group className={styles.inputGroup}>
                <Form.Select
                    className={styles.input}
                    value={formData.applicantType}
                    onChange={(e) => {
                        setFormData(defaultForm);
                        setInputField("applicantType", e.target.value)
                        setApplicantType(e.target.value)
                    }}
                    required
                >
                    <option></option>
                    <option value="INDIVIDUAL">Fyzická osoba</option>
                    <option value="OSVC">Podnikající fyzická osoba</option>
                    <option value="LEGAL_ENTITY">Právnická osoba</option>
                </Form.Select>
            </Form.Group>

            <div className={styles.inputSection}>
                <h3>2</h3>
            </div>
            <Form.Group className={styles.inputGroup}>
                <Form.Label className={styles.label}>Křestní jméno</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    value={formData.name}
                    onChange={(e) => setInputField("name", e.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte Vaše křestní jméno
                </Form.Control.Feedback>

                <Form.Label className={styles.label}>Příjmení</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    value={formData.surname}
                    onChange={(e) => setInputField("surname", e.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte Vaše příjmení
                </Form.Control.Feedback>
            </Form.Group>

            { applicantType === "INDIVIDUAL" ? (
                <Form.Group className={styles.inputGroup}>
                    <Form.Label className={styles.label}>Rodné číslo</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="text"
                        value={formData.birthNum}
                        onChange={(e) => setInputField("birthNum", e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Zadejte Vaše rodné číslo
                    </Form.Control.Feedback>
                </Form.Group>
            ) : null }

            { applicantType === "OSVC" ? (
                <Form.Group className={styles.inputGroup}>
                    <Form.Label className={styles.label}>IČO</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="text"
                        value={formData.IC}
                        onChange={(e) => setInputField("IC", e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Zadejte Vaše IČO
                    </Form.Control.Feedback>
                </Form.Group>
            ) : null }

            { applicantType === "LEGAL_ENTITY" ? (
                <Form.Group className={styles.inputGroup}>
                    <Form.Label className={styles.label}>Název společnosti</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setInputField("companyName", e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Zadejte název Vaší společnosti
                    </Form.Control.Feedback>

                    <Form.Label className={styles.label}>IČO</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="text"
                        value={formData.IC}
                        onChange={(e) => setInputField("IC", e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Zadejte Vaše IČO
                    </Form.Control.Feedback>

                    <Form.Label className={styles.label}>Pozice</Form.Label>
                        <Form.Select
                            className={styles.input}
                            value={formData.position}
                            onChange={(e) => setInputField("position", e.target.value)}
                            required
                        >
                        <option>členka představenstva</option>
                        <option>členka správní rady</option>
                        <option>členka výboru</option>
                        <option>člen představenstva</option>
                        <option>člen psprávní rady</option>
                        <option>člen výboru</option>
                        <option>ekonom</option>
                        <option>ekonomka</option>
                        <option>generální ředitel</option>
                        <option>generální ředitelka</option>
                        <option>jednatel</option>
                        <option>jednatelka</option>
                        <option>místopředseda</option>
                        <option>místopředsedkyně</option>
                        <option>místostarosta</option>
                        <option>místostarostka</option>
                        <option>předseda</option>
                        <option>předseda představenstva</option>
                        <option>předseda správní rady</option>
                        <option>předsedkyně</option>
                        <option>předsedkyně představenstva</option>
                        <option>předsedkyně správní rady</option>
                        <option>primátor</option>
                        <option>primátorka</option>
                        <option>prokurista</option>
                        <option>prokuristka</option>
                        <option>ředitel</option>
                        <option>ředitelka</option>
                        <option>společník</option>
                        <option>starosta</option>
                        <option>starostka</option>
                        <option>statutární ředitel</option>
                        <option>statutární ředitelka</option>
                        <option>účetní</option>
                        <option>zástupce</option>
                        <option>zástupkyně</option>
                        <option>zplnomocněná</option>
                        <option>zplnomocněný</option>
                    </Form.Select>
                </Form.Group>

            ) : (
                null
            ) }
            
            <Form.Group className={styles.inputGroup}>
                <Form.Label className={styles.label}>Státní příslušnost</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setInputField("nationality", e.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte Vaší státní příslušnost
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={styles.inputGroup}>
                <Form.Label className={styles.label}>E-mail</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setInputField("email", e.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte Váš E-mail
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={styles.inputGroup}>
                <Form.Label className={styles.label}>Telefon</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setInputField("phone", e.target.value)}
                    pattern={phoneRegex}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte Váše telefonní číslo
                </Form.Control.Feedback>
            </Form.Group>

            <div className={styles.inputSection}>
                <h3>3</h3>
            </div>
            { applicantType === "INDIVIDUAL" ? <h4>Adresa trvalého pobytu</h4> : null}
            { applicantType === "OSVC" ? <h4>Adresa trvalého pobytu</h4> : null}
            { applicantType === "LEGAL_ENTITY" ? <h4>Adresa sídla</h4> : null}
            
            <Form.Group className={styles.inputGroup}>
                <Form.Label className={styles.label}>Ulice</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => setAddressInputField("street", e.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte ulici
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={styles.inputGroup}>
                <Form.Label className={styles.label}>Číslo popisné</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    value={formData.address.descNumber}
                    onChange={(e) => setAddressInputField("descNumber", parseInt(e.target.value))}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte číslo popisné
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={styles.inputGroup}>
                <Form.Label className={styles.label}>Číslo orientační</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    value={formData.address.indicativeNumber}
                    onChange={(e) => setAddressInputField("indicativeNumber", parseInt(e.target.value))}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte číslo orientační
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={styles.inputGroup}>
                <Form.Label className={styles.label}>Město</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => setAddressInputField("city", e.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte město
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={styles.inputGroup}>
                <Form.Label className={styles.label}>PSČ</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    value={formData.address.postalCode}
                    onChange={(e) => setAddressInputField("postalCode", parseInt(e.target.value))}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Zadejte poštovní směrovací číslo
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                id={styles.submitButton}
                type="submit"
            >
                ODESLAT ŽÁDOST
            </Button>
            { requestAddCall.error ? <Alert variant='danger'>{requestAddCall.error.errorMessage}</Alert> : null }
        </Form>
    </div>
  )
}