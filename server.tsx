// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";
import {
  contentTypeFilter,
  createApp,
} from "https://deno.land/x/servest/mod.ts";

const app = createApp();

let colors_arr: array = [];

app.post(
  "/",
  contentTypeFilter("application/x-www-form-urlencoded"),
  async (req) => {
    const bodyForm = await req.formData();
    const color = bodyForm.value("colorInput");
    colors_arr.push({ color: color, index: colors_arr.length + 1 });
    await req.redirect("/");
  }
);

app.get("/", async (req) => {
  console.log(colors_arr);
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Colores</title>
        </head>
        <body>
          <main
            style={{
              display: "flex",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <form
              method="POST"
              action="/"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignSelf: "center",
                gap: "4px",
                width: "50%",
              }}
            >
              <label
                htmlFor="colorInput"
                style={{ fontWeight: "bold", fontSize: "30px" }}
              >
                Elegí un color
              </label>
              <input type="color" id="colorInput" name="colorInput" />
              <button type="submit" style={{ width: "25%" }}>
                Submit
              </button>
            </form>
            <ul
              style={{
                background: "black",
                paddingBottom: "20px",
                paddingTop: "20px",
                paddingLeft: "0",
                paddingRight: "0",
                width: "50%",
                alignSelf: "center",
                listStyle: "none",
              }}
            >
              {colors_arr.map((color) => {
                return (
                  <li
                    key={color.index}
                    style={{
                      background: color.color,
                      height: "20px",
                    }}
                  ></li>
                );
              })}
            </ul>
          </main>
        </body>
      </html>
    ),
  });
});
app.listen({ port: 8888 });
