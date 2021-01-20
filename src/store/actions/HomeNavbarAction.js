import HomeNavbar from "../../components/Home/homeNavbar/homeNavbar";

export default function HomeNavbarAction(data){
    return {
        type: "HomeNavbar",
        payload: data
    }
}