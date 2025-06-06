import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, just create a local URL for preview
      // In production, this would upload to a server
      const url = URL.createObjectURL(file);
      onChange(url);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
        id="imageUpload"
      />
      <label
        htmlFor="imageUpload"
        className={cn(
          "border-2 border-dashed rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="max-h-[200px] object-contain rounded-lg"
          />
        ) : (
          <>
            <Upload className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Clique e arraste ou selecione um arquivo do seu computador
            </p>
            <p className="text-xs text-muted-foreground">
              Formatos suportados: .jpg, .jpeg, .png
            </p>
          </>
        )}
      </label>
    </div>
  );
}
