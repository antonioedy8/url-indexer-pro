
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LanguageSwitcherProps {
  language: string;
  onChange: (value: string) => void;
}

export const LanguageSwitcher = ({ language, onChange }: LanguageSwitcherProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Interface Language</Label>
        <p className="text-sm text-muted-foreground">
          Choose the language for the application interface
        </p>
      </div>
      
      <RadioGroup 
        value={language} 
        onValueChange={onChange}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2"
      >
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent">
          <RadioGroupItem value="en" id="en" />
          <Label htmlFor="en" className="cursor-pointer flex-1">English</Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent">
          <RadioGroupItem value="pt" id="pt" />
          <Label htmlFor="pt" className="cursor-pointer flex-1">Português</Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent">
          <RadioGroupItem value="es" id="es" />
          <Label htmlFor="es" className="cursor-pointer flex-1">Español</Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent">
          <RadioGroupItem value="fr" id="fr" />
          <Label htmlFor="fr" className="cursor-pointer flex-1">Français</Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent">
          <RadioGroupItem value="de" id="de" />
          <Label htmlFor="de" className="cursor-pointer flex-1">Deutsch</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
