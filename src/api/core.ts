export async function apiCall(endpoint: string, params: any = {}) {
  try {
    const queryString = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString();
    
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    const response = await fetch(url, 
    //   {
    //   method: 'GET',

    //   // headers: {
    //   //   'Accept': 'application/json',
    //   //   'Content-Type': 'application/json',
    //   // },
    //   // cache: 'default'
    // }
  );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call error:', error);
    return {};
  }
}