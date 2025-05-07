import { Platform } from "react-native";


export const BASE_URL = Platform.OS==='android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api';
export const SOCKET_URL = Platform.OS==='android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
export const GOOGLE_MAP_API = "YOUR_GOOGLEAPI"

// export const BASE_URL = 'http://127.20.10.4:3000/api';