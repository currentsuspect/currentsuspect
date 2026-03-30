import whisper
import sys

# Load a smaller model that doesn't eat up RAM/CPU forever
model = whisper.load_model("base")
result = model.transcribe(sys.argv[1], fp16=False)
print(result["text"])
