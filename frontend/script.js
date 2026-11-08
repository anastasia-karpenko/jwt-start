const token = localStorage.getItem("accessToken");
const loginForm = document.querySelector("#loginForm");
const message = document.querySelector("#message");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();
        if (!response.ok) {
            message.textContent = data.message;
            return;
        }
        localStorage.setItem("accessToken", data.accessToken
        );
        window.location.href = "/dashboard.html";
    });
}

async function apiRequest(url, options = {}) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
}


const profile = document.querySelector("#profile");

if (profile) {
    loadProfile();
}


async function loadProfile() {
    try {
        const data =
            await apiRequest("/api/profile");

        const user = data.user;
        profile.innerHTML = `
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Role:</strong>
        <span class="role">
          ${user.role}
        </span>
      </p>
    `;
        document.querySelector("#debug").textContent =
            JSON.stringify(user, null, 2);
    } catch (error) {
        profile.textContent =
            "Не удалось загрузить профиль";
    }
}


const profileButton =
    document.querySelector("#profileButton");

if (profileButton) {
    profileButton.addEventListener(
        "click",
        async () => {
            try {
                const data =
                    await apiRequest("/api/profile");
                showResult(data);
            } catch (error) {
                showError(error.message);
            }
        }
    );
}


const usersButton =
    document.querySelector("#usersButton");
if (usersButton) {
    usersButton.addEventListener("click", async () => {
        try {
            const data =
                await apiRequest("/api/users");
            showResult(data);
        } catch (error) {
            showError(error.message);

        }

    }
    );
}
const deleteButton = document.querySelector("#deleteButton");
if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
        try {
            const data =
                await apiRequest("/api/users/1", {
                    method: "DELETE"
                });
            showResult(data);
        } catch (error) {
            showError(error.message);
        }
    }
    );
}


function showResult(data) {
    const result = document.querySelector("#result");
    result.className = "success";
    result.textContent = JSON.stringify(data, null, 2);
}

function showError(message) {
    const result = document.querySelector("#result");
    result.className = "error";
    result.textContent = message;
}

const logoutButton = document.querySelector("#logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    }
    );
}