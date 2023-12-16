import { fabric } from "fabric"
import { useEffect, useRef } from "react"

const FabricComponent = ({
  width,
  sentence,
  bg,
  fontSize,
  bgColor,
  textColor,
  blur,
  onChange,
}: {
  width: number
  sentence: string
  bg: string
  fontSize: number
  bgColor: string
  textColor: string
  blur: boolean
  onChange: (text: string) => void
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  let fabricCanvas: fabric.Canvas | null = null

  const adjustCanvasSize = () => {
    if (fabricCanvas && canvasRef.current) {
      const text = fabricCanvas.getObjects()[0]
      //   const textWidth = text.getBoundingRect().width
      const canvasWidth = width >= 700 ? 700 : width
      fabricCanvas?.setDimensions({
        width: canvasWidth,
        height: 50,
      })
      text.set({
        top: (fabricCanvas.height! - text.getBoundingRect().height) / 2,
        width: canvasWidth / 2,
      })
      fabricCanvas.centerObject(text)
      fabricCanvas?.renderAll()
    }
  }

  const initCanvas = () => {
    if (canvasRef.current) {
      fabricCanvas = new fabric.Canvas(canvasRef.current, {
        preserveObjectStacking: true,
      })

      const checkSentence = sentence.replace(/\s/g, " ")
      const text = new fabric.Textbox(checkSentence, {
        fontFamily: "Kanit",
        top: 0,
        fill: textColor,
        fontSize: fontSize,
        hasBorders: true,
        borderColor: "white",
        cornerStyle: "circle",
        borderScaleFactor: 2,
        cornerStrokeColor: "white",
        hasControls: true,
        selectable: true,
        centeredScaling: true,
        lockMovementX: true,
        isWrapping: false,
        textAlign: "center",
        minWidth: 200,
      })

      text.setControlVisible("mtr", false)
      text.setControlVisible("mr", false)
      text.setControlVisible("ml", false)
      text.setControlVisible("mt", false)
      text.setControlVisible("mb", false)

      //   const textWidth = text.getBoundingRect().width
      //   const canvasWidth = width >= 700 ? 700 : width

      text.set({
        top: fabricCanvas.height! / 2 - text.getBoundingRect().height / 2,
      })

      text.on("editing:exited", () => {
        if (text.text) {
          text.set("text", text.text!.replace(/\s/g, " "))
        }
        text.set({
          top: fabricCanvas!.height! / 2 - text.getBoundingRect().height / 2,
        })
        fabricCanvas?.centerObject(text)
        onChange(text.text!)
      })

      text.on("changed", () => {
        const textWidth = text.getBoundingRect().width
        const textHeight = text.getBoundingRect().height

        text.set({
          left: (fabricCanvas!.width! - textWidth) / 2,
          top: fabricCanvas!.height! / 2 - textHeight / 2,
        })

        if (text.text) {
          text.set("text", text.text!.replace(/\s/g, " "))
        }
      })

      text.on("mousedown", () => {
        text.selectAll()
      })
      fabricCanvas!.add(text)

      adjustCanvasSize()
    }
  }

  useEffect(() => {
    initCanvas()
    window.addEventListener("resize", adjustCanvasSize)

    if (fabricCanvas) {
      fabricCanvas.discardActiveObject()
    }
    // cleanup function
    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose()
        fabricCanvas = null
      }

      window.removeEventListener("resize", adjustCanvasSize)
    }
  }, [fontSize, width, sentence, bg, bgColor, textColor, blur])

  return (
    <div
      tabIndex={0}
      className="flex-grow flex items-end justify-center border-b-2 last:border-b-0 border-white  bg-cover bg bg-center"
      style={{ backgroundImage: `url("/${bg}")` }}
    >
      <div
        className=" w-full flex justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <canvas
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          ref={canvasRef}
        />
      </div>
    </div>
  )
}

export default FabricComponent
