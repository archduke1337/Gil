import { type FC } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { jsPDF } from 'jspdf';

const certificateSchema = z.object({
  referenceNumber: z.string().min(1, 'Reference number is required'),
  gemName: z.string().min(1, 'Gem name is required'),
  caratWeight: z.string().min(1, 'Carat weight is required'),
  color: z.string().min(1, 'Color is required'),
  clarity: z.string().min(1, 'Clarity is required'),
  cutGrade: z.string().min(1, 'Cut grade is required'),
  labLocation: z.string().min(1, 'Lab location is required'),
  gemologistName: z.string().min(1, 'Gemologist name is required'),
  equipmentUsed: z.string().min(1, 'Equipment details are required'),
  comments: z.string().optional(),
});

type CertificateFormValues = z.infer<typeof certificateSchema>;

const EnhancedGILCertificateGenerator: FC = () => {
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
  });

  const onSubmit = (data: CertificateFormValues) => {
    generateEnhancedPDF(data);
  };

  const generateEnhancedPDF = (data: CertificateFormValues) => {
    const doc = new jsPDF();
    
    // Add certificate header
    doc.setFontSize(24);
    doc.text('GIL Enhanced Certificate of Authenticity', 105, 20, { align: 'center' });
    
    // Add reference number and date
    doc.setFontSize(12);
    doc.text(`Reference: ${data.referenceNumber}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);
    
    // Add gem details
    doc.text('Gem Details', 20, 70);
    doc.line(20, 72, 190, 72);
    doc.text(`Name: ${data.gemName}`, 30, 85);
    doc.text(`Carat Weight: ${data.caratWeight}`, 30, 95);
    doc.text(`Color: ${data.color}`, 30, 105);
    doc.text(`Clarity: ${data.clarity}`, 30, 115);
    doc.text(`Cut Grade: ${data.cutGrade}`, 30, 125);
    
    // Add certification details
    doc.text('Certification Details', 20, 145);
    doc.line(20, 147, 190, 147);
    doc.text(`Lab Location: ${data.labLocation}`, 30, 160);
    doc.text(`Gemologist: ${data.gemologistName}`, 30, 170);
    doc.text(`Equipment Used: ${data.equipmentUsed}`, 30, 180);
    
    if (data.comments) {
      doc.text('Additional Comments', 20, 200);
      doc.line(20, 202, 190, 202);
      doc.text(data.comments, 30, 215);
    }
    
    // Save the PDF
    doc.save(`GIL_Certificate_${data.referenceNumber}.pdf`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input {...form.register('referenceNumber')} />
              {form.formState.errors.referenceNumber && (
                <p className="text-red-500">{form.formState.errors.referenceNumber.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="gemName">Gem Name</Label>
              <Input {...form.register('gemName')} />
              {form.formState.errors.gemName && (
                <p className="text-red-500">{form.formState.errors.gemName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="caratWeight">Carat Weight</Label>
              <Input type="number" step="0.01" {...form.register('caratWeight')} />
              {form.formState.errors.caratWeight && (
                <p className="text-red-500">{form.formState.errors.caratWeight.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="color">Color Grade</Label>
              <Controller
                name="color"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="D">D (Colorless)</SelectItem>
                      <SelectItem value="E">E (Colorless)</SelectItem>
                      <SelectItem value="F">F (Colorless)</SelectItem>
                      <SelectItem value="G">G (Near Colorless)</SelectItem>
                      <SelectItem value="H">H (Near Colorless)</SelectItem>
                      <SelectItem value="I">I (Near Colorless)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.color && (
                <p className="text-red-500">{form.formState.errors.color.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="clarity">Clarity Grade</Label>
              <Controller
                name="clarity"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select clarity grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FL">FL (Flawless)</SelectItem>
                      <SelectItem value="IF">IF (Internally Flawless)</SelectItem>
                      <SelectItem value="VVS1">VVS1</SelectItem>
                      <SelectItem value="VVS2">VVS2</SelectItem>
                      <SelectItem value="VS1">VS1</SelectItem>
                      <SelectItem value="VS2">VS2</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.clarity && (
                <p className="text-red-500">{form.formState.errors.clarity.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="cutGrade">Cut Grade</Label>
            <Controller
              name="cutGrade"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cut grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Very Good">Very Good</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.cutGrade && (
              <p className="text-red-500">{form.formState.errors.cutGrade.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="labLocation">Lab Location</Label>
              <Input {...form.register('labLocation')} />
              {form.formState.errors.labLocation && (
                <p className="text-red-500">{form.formState.errors.labLocation.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="gemologistName">Gemologist Name</Label>
              <Input {...form.register('gemologistName')} />
              {form.formState.errors.gemologistName && (
                <p className="text-red-500">{form.formState.errors.gemologistName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="equipmentUsed">Equipment Used</Label>
            <Input {...form.register('equipmentUsed')} />
            {form.formState.errors.equipmentUsed && (
              <p className="text-red-500">{form.formState.errors.equipmentUsed.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="comments">Additional Comments</Label>
            <Input {...form.register('comments')} />
          </div>

          <Button type="submit">Generate Enhanced Certificate</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedGILCertificateGenerator;