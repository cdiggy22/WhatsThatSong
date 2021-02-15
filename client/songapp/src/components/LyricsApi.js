import axios from "axios";
import { TOKEN_STORAGE_ID } from "../App.js";


const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class LyricsApi {
  static async request(endpoint, params = {}, verb = "get") {

    let _token = localStorage.getItem(TOKEN_STORAGE_ID);

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(
        `${BASE_URL}/${endpoint}`, { params: { _token, ...params } });
    } else if (verb === "post") {
      q = axios.post(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
        console.log('connected')
        return (await q).data;
      
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
// ****************** ARTIST ROUES ********************
  static async getArtists(search) {
    let res = await this.request("artists", { search });
    return res.artist;
  }

  static async getArtist(artist_id) {
    let res = await this.request(`artists/${artist_id}`);
    return res.artist;
  }
// *************** TRACKS ROUTES********************
  static async getTracks(search) {
    let res = await this.request("tracks", { search });
    return res.track_list;
  }

  static async getTrack(track_id) {
    let res = await this.request(`tracks/${track_id}`);
    return res.track
  }
//  ************AUTH ROUTES*******************
  static async login(data) {
    let res = await this.request(`login`, data, "post");
    return res.token;
  }

  static async register(data) {
    let res = await this.request(`users`, data, "post");
    return res.token;
  }
//   *******************USER ROUTES******************
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

//   ******************** SEARCH ROUTES ******************
  static async topTracks(search) {
      let res = await this.request(`search/top`, { search });
      return res;
  }

  static async lyricSearch(lyrics) {
      let res = await this.request(`search/tracks/${lyrics}`);
      return res;
  }
}


export default LyricsApi;
