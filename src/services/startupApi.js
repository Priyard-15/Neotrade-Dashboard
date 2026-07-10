import axios from "axios"

const startupClient = axios.create({
  baseURL: import.meta.env.VITE_STARTUP_ANALYTICS_API_BASE_URL || "https://example-startup-api.com",
  timeout: 10000,
})

export function hasStartupApiBaseUrl(){
  return Boolean(import.meta.env.VITE_STARTUP_ANALYTICS_API_BASE_URL)
}

export async function fetchStartupData(startupId, apiKey){
  if(!startupId){
    throw new Error("Startup ID is required")
  }

  const params = {
    startupId,
  }

  if(apiKey){
    params.apiKey = apiKey
  }

  const response = await startupClient.get("/startup/metrics", {
    params,
  })

  return response.data
}
