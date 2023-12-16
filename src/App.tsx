import "./App.css"
import Canvas from "./components/Canvas"
import { useState, useEffect, useRef } from "react"
import { ImFontSize } from "react-icons/im"
import { SketchPicker } from "react-color"
import reactCSS from "reactcss"
import { PiSelectionBackground } from "react-icons/pi"
import { MdFormatColorText } from "react-icons/md"
import { MdDownload } from "react-icons/md"
import html2canvas from "html2canvas"

function App() {
  const [parentWidth, setParentWidth] = useState(window.innerWidth)
  const [fontSize, setFontSize] = useState(28)

  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [displayTextColorPicker, setDisplayTextColorPicker] = useState(false)
  const [bgColor, setBgColor] = useState("#000")
  const [textColor, setTextColor] = useState("#fff")
  const captureRef = useRef(null)

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  useEffect(() => {
    const handleResize = () => {
      setParentWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [parentWidth])

  const handleCaptureAndDownload = () => {
    const captureElement = captureRef.current

    if (captureElement) {
      html2canvas(captureElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.download = new Date().toISOString() + "screenshot.png"
        link.href = imgData
        link.click()
      })
    }
  }

  const styles: any = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: bgColor,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  })
  const textStyles: any = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: textColor,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  })

  return (
    <>
      <div className="flex flex-col h-[100dvh] max-w-[700px] mx-auto overflow-hidden px-4 py-10 relative">
        <div className="flex justify-between items-center mb-2 gap-4 text-1xl">
          <div className="flex items-center gap-2">
            <ImFontSize />
            <span className="w-4">{fontSize}</span>
            <button
              className="bg-rose-400 w-6 h-6 rounded-full"
              onClick={() => setFontSize(fontSize - 1)}
            >
              -
            </button>
            <button
              className="bg-green-400 w-6 h-6 rounded-full"
              onClick={() => setFontSize(fontSize + 1)}
            >
              +
            </button>
          </div>
          <div className="absolute items-center gap-2 flex ml-[140px] z-50">
            <PiSelectionBackground />
            <div style={styles.swatch} onClick={handleClick}>
              <div style={styles.color} />
            </div>
            {displayColorPicker ? (
              <div style={styles.popover} className="mt-8">
                <div
                  style={styles.cover}
                  onClick={() => setDisplayColorPicker(false)}
                />
                <SketchPicker
                  color={bgColor}
                  className="mt-80 ml-[-70px]"
                  onChange={(color: any) => setBgColor(color.hex)}
                />
              </div>
            ) : null}

            <MdFormatColorText />

            <div
              style={textStyles.swatch}
              onClick={() => setDisplayTextColorPicker(true)}
            >
              <div style={textStyles.color} />
            </div>
            {displayTextColorPicker ? (
              <div style={textStyles.popover} className="mt-8">
                <div
                  style={textStyles.cover}
                  onClick={() => setDisplayTextColorPicker(false)}
                />
                <SketchPicker
                  color={textColor}
                  className="mt-80"
                  onChange={(color: any) => setTextColor(color.hex)}
                />
              </div>
            ) : null}
          </div>
          <button onClick={handleCaptureAndDownload} className="text-3xl">
            <MdDownload className="text-black" />
          </button>
        </div>
        <div className="flex flex-col h-[80dvh] bg-black p-2" ref={captureRef}>
          <Canvas
            bgColor={bgColor}
            textColor={textColor}
            fontSize={fontSize}
            bg="bg-1.png"
            sentence="ผมชอบกินก๋วยเตี๋ยวไก่"
            width={parentWidth}
          />
          <Canvas
            bgColor={bgColor}
            textColor={textColor}
            fontSize={fontSize}
            bg="bg-2.png"
            sentence="วันไหนร้านปิด"
            width={parentWidth}
          />
          <Canvas
            bgColor={bgColor}
            textColor={textColor}
            fontSize={fontSize}
            bg="bg-3.png"
            sentence="หงุดหงิดฉิบหาย"
            width={parentWidth}
          />
          <div className="text-right py-2 text-xs text-white">
            https://jay-man.vercel.app
          </div>
        </div>
        <div>
          Build with ❤️ by{" "}
          <a
            href="https://facebook.com/pasupol.b/"
            target="_blank"
            className="underline text-blue-400"
          >
            Niaw
          </a>
        </div>
      </div>
    </>
  )
}

export default App
