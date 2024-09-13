const BASE_URL = "http://localhost:3000/";

export async function login(loginData) {
  try {
    const res = await fetch(`${BASE_URL}account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signup(newAccount) {
  try {
    const res = await fetch(`${BASE_URL}account/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function checkStatus() {
  try {
    const res = await fetch(`${BASE_URL}auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.user) {
      return {
        loggedIn: true,
        user: data.user,
      };
    } else {
      return {
        loggedIn: false,
        user: null,
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function resetPassword(resetData) {
  console.log(resetData);
  try {
    const res = await fetch(`${BASE_URL}account/reset-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetData),
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Reset Password failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userData) {
  console.log(userData);
  try {
    const res = await fetch(`${BASE_URL}account/update-user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Update failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
