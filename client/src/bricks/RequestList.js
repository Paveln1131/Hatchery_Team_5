import {useEffect, useMemo, useState} from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import Request from './Request'
import {Form, FormSelect} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function RequestList(){

    const [requestListLoadCall, setRequestListLoadCall] = useState({
        state: "pending"
    });

    const [searchBy, setSearchBy] = useState("");
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        onRefresh()
    }, []);

    function onRefresh(){
        fetch(`http://localhost:3000/request/list`, {
            method: "GET",
            headers:{
                Authorization: 'Bearer '+'qdsMkMpb16'
            }
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRequestListLoadCall({ state: "error", error: responseJson });
            } else {
                setRequestListLoadCall({ state: "success", data: responseJson });
            }
        });
    }

    const filteredAndSortedRequestList = useMemo(() => {
        if (!requestListLoadCall.data) return []
        let filteredList = requestListLoadCall.data.filter((item) => {
            return (
                item.applicantType
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase())

            );
        })
        if (!sortBy){
            return filteredList
        }
        else if (sortBy === "surname asc"){
            return (
                filteredList.sort((a,b) => {
                    return(
                        a.surname.localeCompare(b.surname)
                    )}
            ))
        }
        else if (sortBy === "surname desc"){
            return (
                filteredList.sort((a,b) => {
                    return(
                        b.surname.localeCompare(a.surname)
                    )}
                ))
        }
        else if (sortBy === "amount asc"){
            return (
                filteredList.sort((a,b) => {
                    return(
                        a.amount - b.amount
                    )}
                ))
        }
        else if (sortBy === "amount desc"){
            return (
                filteredList.sort((a,b) => {
                    return(
                        b.amount - a.amount
                    )}
                ))
        }

    }, [searchBy,sortBy, requestListLoadCall.data]);


    function handleSearch(event) {
        //event.preventDefault();
        //setSearchBy(event.target["searchInput"].value);

    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }

    function handleSortBySurname(){
        console.log(sortBy)
        if (sortBy === "surname asc") {
            setSortBy("surname desc")
        }
        else if (sortBy === "surname desc") {
            setSortBy("")
        }
        else setSortBy("surname asc")
    }
    function handleSortByAmount(){
        console.log(sortBy)
        if (sortBy === "amount asc") {
            setSortBy("amount desc")
        }
        else if (sortBy === "amount desc") {
            setSortBy("")
        }
        else setSortBy("amount asc")
    }

    function getChild() {
        switch (requestListLoadCall.state) {
            case "pending":
                return (
                    <div>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <>
                        <Form style={{width:"80%",display:"flex",justifyContent:"flex-start"}} onSubmit={handleSearch}>
                            <Form.Group style={{margin:"10px"}}>
                                <div style={{display:"flex",justifyContent:"flex-start"}}>
                                    <span style={{margin:"10px"}}>Filtrovat podle: </span>
                                    <FormSelect
                                        onChange={handleSearch}
                                        id={"searchInput"}
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        style={{width:"max-content"}}
                                    >
                                        <option value={"INDIVIDUAL"}>Fyzická osoba</option>
                                        <option value={"OSVC"}>Fyzická osoba podnikatel </option>
                                        <option value={"LEGAL_ENTITY"}>Právnická osoba</option>
                                    </FormSelect>
                                </div>
                            </Form.Group>

                            <Form.Group style={{margin:"10px"}}>
                                <div style={{display:"flex",justifyContent:"flex-start"}}>
                                    <span style={{margin:"10px"}}>Řadit podle: </span>
                                    <Button
                                        style={{marginRight:"10px"}}
                                        variant="light"
                                        onClick={handleSortBySurname}
                                    >
                                        Příjmení {sortBy === "" ? "" : sortBy === "surname asc" ? "↓" : sortBy === "surname desc" ? "↑" : ""}
                                    </Button>

                                    <Button variant="light"
                                            onClick={handleSortByAmount}
                                    >
                                        Výše úvěru {sortBy === "" ? "" : sortBy === "amount asc" ? "↓" : sortBy === "amount desc" ? "↑" : ""}
                                    </Button>
                                </div>
                            </Form.Group>
                        </Form>
                        <Request requestList={filteredAndSortedRequestList} onRefresh ={onRefresh}/>
                    </>
                );
            case "error":
                return (
                    <div>
                        <div>Nepodařilo se načíst data o žádostech.</div>
                        <br />
                        <pre>{JSON.stringify(requestListLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return getChild();
}

export default RequestList