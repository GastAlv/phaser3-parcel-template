import axios from "axios";

export let ipPublic;

export async function getIp(){
  try {
    const resIp = await axios.get("https://api.ipify.org?format=json");
    console.log(resIp.data.ip);
    ipPublic = resIp.data.ip
    return ipPublic;
  } catch (error) {
    console.log(error);
  }
}