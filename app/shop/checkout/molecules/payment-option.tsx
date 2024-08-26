import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function PaymentOption() {
  return (
    <RadioGroup className="my-3" defaultValue="transfer">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="transfer" id="r1" />
        <Label htmlFor="r1">Bank Transfer</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="card" id="r2" />
        <Label htmlFor="r2">Debit Card</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Wallet</Label>
      </div>
    </RadioGroup>
  );
}
