export default ({ codeHtml, code, lang }) => (
    <div className="ysink_code_wrapper">
        <div className="ysink_code_lang">{lang}</div>
        <pre>
            {codeHtml ? (
                <code
                    className={`hljs ${lang}`}
                    dangerouslySetInnerHTML={{ __html: codeHtml }}
                />
            ) : (
                <code className={`hljs ${lang}`}>{code}</code>
            )}
        </pre>
    </div>
);
