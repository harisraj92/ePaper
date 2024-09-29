import React, { useContext } from "react"
import { CanvasContext } from "./CanvasContext"
import "@flaticon/flaticon-uicons/css/all/all.css"


export const sizeList = [
    "8px",
    "9px",
    "10px",
    "11px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "72px",
    "100px"
]


export const fontList = [
    "Arial",
    "Arial Black",
    "Arial Unicode MS",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Candara",
    `Segoe UI, wf_segoe-ui_normal, helvetica, arial, sans-serif`,
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Corbel",
    "Courier New",
    "Georgia",
    "Lucida Sans Unicode",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    "Roboto",
    "Kalaham Regular",
    "Noto Serif Tamil"
]

export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];




export default function Toolbar({ isEditEnable, saveCanvasData }) {
    const { actions } = useContext(CanvasContext)
    const addElement = type => {
        actions?.addElement(type)
    }
    const addHeading = type => {
        actions?.addHeading(type)
    }
    return (
        <div>
            <div>
                <div className="flex flex-wrap">
                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <a
                                href="/"
                                title="Home"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <i
                                    class="fi fi-sr-home"
                                    title="Home"
                                    style={{ fontSize: "24px", color: "wheat" }}
                                ></i>
                            </a>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <a
                                href="/"
                                title="Add Page"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <i
                                    class="fi fi-sr-add-document"
                                    title="Add Page"
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </a>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <button
                                onClick={saveCanvasData}
                                title="Save Page"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <i className="fi fi-sr-disk" title="Save Page" style={{ fontSize: "24px" }}></i>
                            </button>

                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <a
                                href="/"
                                title="Delete"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <i
                                    class="fi fi-bs-trash"
                                    title="Delete"
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </a>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <a
                                href="/"
                                title="export"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <i
                                    class="fi fi-sr-file-export"
                                    title="export"
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </a>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <a
                                href="#"
                                title="text"
                                style={{ textDecoration: "none", color: "inherit" }}
                                onClick={() => addElement("TEXT")}
                            >
                                <i
                                    class="fi fi-sr-message-text"
                                    title="text"
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </a>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <a
                                href="#"
                                title="text"
                                style={{ textDecoration: "none", color: "inherit" }}
                                onClick={() => addHeading("HEADING")}
                            >
                                <i
                                    class="fi fi-bs-heading"
                                    title="Heading"
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </a>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <a
                                href="#"
                                title="add image"
                                style={{ textDecoration: "none", color: "inherit" }}
                                onClick={() => addElement("IMAGE")}
                            >
                                <i
                                    class="fi fi-br-add-image"
                                    title="add image"
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </a>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <a
                                href="/"
                                title="preview"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <i
                                    class="fi fi-sr-overview"
                                    title="preview"
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </a>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-gray-500 p-2 rounded-md">
                            <a
                                href="/"
                                title="frame"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <i
                                    class="fi fi-br-frame"
                                    title="preview"
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                {isEditEnable && (
                    <div id="toolbar">
                        <select className="ql-font">
                            {fontList.map((font) => (
                                <option value={font}>{font}</option>
                            ))}
                        </select>
                        <select className="ql-size">
                            {sizeList.map((size) => (
                                <option value={size}>{size}</option>
                            ))}
                        </select>
                        <select className="ql-header">
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                            <option value="">Normal</option>
                        </select>

                        <button className="ql-bold" />
                        <button className="ql-italic" />
                        <button className="ql-underline" />
                        <button className="ql-strike" />
                        <select className="ql-align" />
                        <select className="ql-color" />
                        <select className="ql-background" />
                        <button className="ql-list" value="ordered" />
                        <button className="ql-list" value="bullet" />
                        <button className="ql-indent" value="-1" />
                        <button className="ql-indent" value="+1" />

                    </div>
                )}
            </div>
        </div>
    )
}
