import { type FC } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { jsPDF } from 'jspdf';

const certificateSchema = z.object({
  gemName: z.string().min(1, 'Gem name is required'),
  caratWeight: z.string().min(1, 'Carat weight is required'),
  color: z.string().min(1, 'Color is required'),
  clarity: z.string().min(1, 'Clarity is required'),
  cutGrade: z.string().min(1, 'Cut grade is required'),
});

type CertificateFormValues = z.infer<typeof certificateSchema>;

const CertificateGenerator: React.FC = () => {
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      gemName: '',
      caratWeight: '',
      color: '',
      clarity: '',
      cutGrade: '',
    },
  });

  const onSubmit = (data: CertificateFormValues) => {
    generatePDF(data);
  };

  const generatePDF = (data: CertificateFormValues) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('GIL Certificate of Authenticity', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Gem Name: ${data.gemName}`, 20, 40);
    doc.text(`Carat Weight: ${data.caratWeight}`, 20, 50);
    doc.text(`Color: ${data.color}`, 20, 60);
    doc.text(`Clarity: ${data.clarity}`, 20, 70);
    doc.text(`Cut Grade: ${data.cutGrade}`, 20, 80);
    
    doc.save('certificate.pdf');
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="gemName">Gem Name</Label>
            <Input id="gemName" {...form.register('gemName')} />
            {form.formState.errors.gemName && (
              <p className="text-red-500">{form.formState.errors.gemName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="caratWeight">Carat Weight</Label>
            <Input id="caratWeight" type="number" step="0.01" {...form.register('caratWeight')} />
            {form.formState.errors.caratWeight && (
              <p className="text-red-500">{form.formState.errors.caratWeight.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Input id="color" {...form.register('color')} />
            {form.formState.errors.color && (
              <p className="text-red-500">{form.formState.errors.color.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="clarity">Clarity</Label>
            <Input id="clarity" {...form.register('clarity')} />
            {form.formState.errors.clarity && (
              <p className="text-red-500">{form.formState.errors.clarity.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cutGrade">Cut Grade</Label>
            <Input id="cutGrade" {...form.register('cutGrade')} />
            {form.formState.errors.cutGrade && (
              <p className="text-red-500">{form.formState.errors.cutGrade.message}</p>
            )}
          </div>

          <Button type="submit">Generate Certificate</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CertificateGenerator;