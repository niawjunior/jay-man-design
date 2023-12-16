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
  const [blur, setBlur] = useState(false)
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [displayTextColorPicker, setDisplayTextColorPicker] = useState(false)
  const [bgColor, setBgColor] = useState("#000")
  const [textColor, setTextColor] = useState("#fff")
  const captureRef = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isInApp, setIsInApp] = useState(true)
  const [text1, setText1] = useState("ผมชอบกินก๋วยเตี๋ยวไก่")
  const [text2, setText2] = useState("วันไหนร้านปิด")
  const [text3, setText3] = useState("หงุดหงิดฉิบหาย")

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

  useEffect(() => {
    const sUsrAg = navigator.userAgent

    // The order matters here, and this may report false positives for unlisted browsers.

    if (sUsrAg.indexOf("Firefox") > -1) {
      setIsInApp(false)
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
      setIsInApp(false)
      // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
      setIsInApp(false)
      // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
      setIsInApp(false)
      // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
      setIsInApp(false)
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
      setIsInApp(false)
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
      setIsInApp(false)
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
      setIsInApp(true)
    }
  }, [])

  const handleCaptureAndDownload = () => {
    // alert("Please open the system browser to download the image.")
    setBlur(!blur)

    if (!isInApp) {
      setTimeout(() => {
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
      }, 100)
    } else {
      alert("กรุณาเปิดผ่าน Google Chrome หรือ Safari เพื่อดาวน์โหลดรูปภาพ")
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
            blur={blur}
            bgColor={bgColor}
            textColor={textColor}
            fontSize={fontSize}
            bg="bg-1.png"
            sentence={text1}
            width={parentWidth}
            onChange={(e) => setText1(e)}
          />
          <Canvas
            blur={blur}
            bgColor={bgColor}
            textColor={textColor}
            fontSize={fontSize}
            bg="bg-2.png"
            sentence={text2}
            width={parentWidth}
            onChange={(e) => setText2(e)}
          />
          <Canvas
            blur={blur}
            bgColor={bgColor}
            textColor={textColor}
            fontSize={fontSize}
            bg="bg-3.png"
            sentence={text3}
            width={parentWidth}
            onChange={(e) => setText3(e)}
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
