/* eslint-disable react/jsx-no-comment-textnodes */
export default function About() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <pre>
        Hypershare is a free file sharing platform.
        <br />
        <ul>
          <li>Inactive files are hosted for 30 Days.</li>
          <li>Every file is unique</li>
          <li>Illegal content is strictly forbidden.</li>
          <li>
            Hypershare is{" "}
            <a
              href="https://github.com/yussufsassi/hypershare"
              target={"_blank"}
              rel="noreferrer"
              style={{
                textDecoration: "underline",
              }}
            >
              100% Open source.
            </a>
          </li>
        </ul>
        <small>//TODO: Improve About page...</small>
      </pre>
    </div>
  )
}
