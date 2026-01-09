import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  FileText,
  Bot,
  MessageSquare,
  Sparkles,
  Clock,
  Target,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EvaluationResult {
  status: 'success' | 'partial' | 'failure';
  score: number;
  duration: number;
  outputs: {
    field: string;
    extracted: string;
    expected?: string;
    match: boolean;
  }[];
  decision?: {
    action: string;
    confidence: number;
    reasoning: string;
  };
  metrics: {
    label: string;
    value: string;
    status: 'good' | 'warning' | 'error';
  }[];
}

const taxonomies = [
  {
    id: 'finance',
    name: 'Finance',
    useCases: ['Invoice Processing', 'Credit Analysis', 'Expense Claims', 'Budget Approval'],
  },
  {
    id: 'hr',
    name: 'Human Resources',
    useCases: ['Candidate Screening', 'Employee Onboarding', 'Leave Requests', 'Performance Review'],
  },
  {
    id: 'procurement',
    name: 'Procurement',
    useCases: ['Vendor Onboarding', 'Purchase Requests', 'Contract Review', 'RFP Analysis'],
  },
  {
    id: 'it',
    name: 'IT Operations',
    useCases: ['Service Requests', 'Incident Triage', 'Change Management', 'Asset Management'],
  },
  {
    id: 'legal',
    name: 'Legal',
    useCases: ['Contract Analysis', 'Compliance Review', 'NDA Processing', 'IP Review'],
  },
];

const aiCapabilities = [
  { id: 'idp', name: 'AI Doc Reader (IDP)', icon: FileText, description: 'Document extraction & processing' },
  { id: 'agent', name: 'AI Agent 2.0', icon: Bot, description: 'Autonomous decision making' },
  { id: 'assistant', name: 'AI Assistant', icon: MessageSquare, description: 'Interactive guidance' },
];

const sampleInputs: Record<string, string> = {
  'Invoice Processing': `INVOICE #INV-2024-0892
Vendor: Acme Technologies Ltd.
Date: January 15, 2024
Due Date: February 14, 2024

Bill To:
TechCorp Industries
123 Business Ave, Suite 500
San Francisco, CA 94102

Items:
1. Cloud Services (Monthly) - $2,450.00
2. API Integration License - $1,200.00
3. Support & Maintenance - $800.00

Subtotal: $4,450.00
Tax (8.5%): $378.25
Total: $4,828.25

Payment Terms: Net 30
Bank: First National Bank
Account: ****4521`,
  'Candidate Screening': `RESUME - Software Engineer Position

Name: Jane Smith
Email: jane.smith@email.com
Phone: (555) 123-4567

Experience:
- Senior Developer at Google (2020-2024)
- Software Engineer at Microsoft (2017-2020)
- Junior Developer at Startup XYZ (2015-2017)

Education:
- M.S. Computer Science, Stanford University
- B.S. Computer Science, MIT

Skills: Python, JavaScript, React, Node.js, AWS, Docker, Kubernetes
Certifications: AWS Solutions Architect, Google Cloud Professional`,
  'Contract Analysis': `SERVICE AGREEMENT

This Agreement is entered into as of March 1, 2024

PARTIES:
1. Provider: CloudTech Solutions Inc.
2. Client: Enterprise Corp.

TERM: 24 months from effective date
AUTO-RENEWAL: Yes, 12-month periods
TERMINATION NOTICE: 90 days

FEES:
- Monthly Service Fee: $15,000
- Implementation Fee: $25,000 (one-time)
- Annual Increase: Not to exceed 5%

LIABILITY CAP: $500,000
GOVERNING LAW: State of Delaware`,
};

interface RunEvaluationModalProps {
  trigger?: React.ReactNode;
  defaultTaxonomy?: string;
  defaultUseCase?: string;
}

export function RunEvaluationModal({
  trigger,
  defaultTaxonomy,
  defaultUseCase,
}: RunEvaluationModalProps) {
  const [open, setOpen] = useState(false);
  const [taxonomy, setTaxonomy] = useState(defaultTaxonomy || '');
  const [useCase, setUseCase] = useState(defaultUseCase || '');
  const [capability, setCapability] = useState('');
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [stage, setStage] = useState<string>('');

  const selectedTaxonomy = taxonomies.find((t) => t.id === taxonomy);
  const useCases = selectedTaxonomy?.useCases || [];

  const handleUseCaseChange = (value: string) => {
    setUseCase(value);
    if (sampleInputs[value]) {
      setInput(sampleInputs[value]);
    }
  };

  const simulateEvaluation = async () => {
    setIsRunning(true);
    setResult(null);
    setProgress(0);

    const stages = [
      'Initializing evaluation...',
      'Processing input document...',
      'Running AI extraction...',
      'Validating outputs...',
      'Computing metrics...',
      'Finalizing results...',
    ];

    for (let i = 0; i < stages.length; i++) {
      setStage(stages[i]);
      setProgress(((i + 1) / stages.length) * 100);
      await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400));
    }

    // Generate simulated results based on capability
    const mockResult: EvaluationResult = {
      status: Math.random() > 0.15 ? 'success' : Math.random() > 0.5 ? 'partial' : 'failure',
      score: 85 + Math.floor(Math.random() * 15),
      duration: 1.2 + Math.random() * 2,
      outputs: [],
      metrics: [],
    };

    if (capability === 'idp') {
      mockResult.outputs = [
        { field: 'Vendor Name', extracted: 'Acme Technologies Ltd.', expected: 'Acme Technologies Ltd.', match: true },
        { field: 'Invoice Number', extracted: 'INV-2024-0892', expected: 'INV-2024-0892', match: true },
        { field: 'Total Amount', extracted: '$4,828.25', expected: '$4,828.25', match: true },
        { field: 'Due Date', extracted: 'February 14, 2024', expected: 'February 14, 2024', match: true },
        { field: 'Payment Terms', extracted: 'Net 30', expected: 'Net 30', match: true },
      ];
      mockResult.metrics = [
        { label: 'Extraction Accuracy', value: '98%', status: 'good' },
        { label: 'Field Confidence', value: '94%', status: 'good' },
        { label: 'Processing Time', value: '1.8s', status: 'good' },
      ];
    } else if (capability === 'agent') {
      mockResult.decision = {
        action: 'Approve for Payment',
        confidence: 92,
        reasoning: 'Invoice matches PO #45231. Vendor is in approved list. Amount within budget threshold ($5,000). All required fields validated.',
      };
      mockResult.metrics = [
        { label: 'Decision Confidence', value: '92%', status: 'good' },
        { label: 'Rule Matches', value: '4/4', status: 'good' },
        { label: 'Risk Score', value: 'Low', status: 'good' },
      ];
    } else {
      mockResult.outputs = [
        { field: 'Query Understanding', extracted: 'High', match: true },
        { field: 'Response Relevance', extracted: '95%', match: true },
        { field: 'Action Suggested', extracted: 'Route to finance team', match: true },
      ];
      mockResult.metrics = [
        { label: 'Response Quality', value: '96%', status: 'good' },
        { label: 'Latency', value: '0.8s', status: 'good' },
        { label: 'Context Retention', value: '100%', status: 'good' },
      ];
    }

    setResult(mockResult);
    setIsRunning(false);
    setStage('');
  };

  const handleReset = () => {
    setResult(null);
    setProgress(0);
    setStage('');
  };

  const canRun = taxonomy && useCase && capability && input.trim();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Play className="h-4 w-4" />
            Run Evaluation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Run AI Evaluation
          </DialogTitle>
          <DialogDescription>
            Test AI capabilities with custom inputs and see real-time evaluation results
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {/* Configuration Section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Taxonomy</Label>
                <Select value={taxonomy} onValueChange={(v) => { setTaxonomy(v); setUseCase(''); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select taxonomy" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxonomies.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Use Case</Label>
                <Select value={useCase} onValueChange={handleUseCaseChange} disabled={!taxonomy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select use case" />
                  </SelectTrigger>
                  <SelectContent>
                    {useCases.map((uc) => (
                      <SelectItem key={uc} value={uc}>
                        {uc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>AI Capability</Label>
                <Select value={capability} onValueChange={setCapability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select capability" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiCapabilities.map((cap) => (
                      <SelectItem key={cap.id} value={cap.id}>
                        <div className="flex items-center gap-2">
                          <cap.icon className="h-4 w-4" />
                          {cap.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Test Input</Label>
                {useCase && sampleInputs[useCase] && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setInput(sampleInputs[useCase])}
                    className="text-xs"
                  >
                    Load sample
                  </Button>
                )}
              </div>
              <Textarea
                placeholder="Paste your document content, request text, or test data here..."
                className="min-h-[150px] font-mono text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Progress Section */}
            {isRunning && (
              <div className="space-y-3 p-4 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm font-medium">{stage}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Results Section */}
            {result && (
              <div className="space-y-4">
                <Separator />
                
                {/* Result Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {result.status === 'success' ? (
                      <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    ) : result.status === 'partial' ? (
                      <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <Target className="h-5 w-5 text-yellow-500" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                        <XCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">
                        {result.status === 'success' ? 'Evaluation Passed' : 
                         result.status === 'partial' ? 'Partial Success' : 'Evaluation Failed'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Completed in {result.duration.toFixed(2)}s
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{result.score}%</div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {result.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-3 rounded-lg border",
                        metric.status === 'good' && "bg-green-500/5 border-green-500/20",
                        metric.status === 'warning' && "bg-yellow-500/5 border-yellow-500/20",
                        metric.status === 'error' && "bg-red-500/5 border-red-500/20"
                      )}
                    >
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                      <div className="text-lg font-semibold">{metric.value}</div>
                    </div>
                  ))}
                </div>

                {/* Extraction Outputs */}
                {result.outputs.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Extracted Fields
                    </h5>
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-3 py-2 text-left font-medium">Field</th>
                            <th className="px-3 py-2 text-left font-medium">Extracted Value</th>
                            <th className="px-3 py-2 text-center font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.outputs.map((output, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="px-3 py-2 font-medium">{output.field}</td>
                              <td className="px-3 py-2 font-mono text-xs">{output.extracted}</td>
                              <td className="px-3 py-2 text-center">
                                {output.match ? (
                                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                                    Match
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
                                    Mismatch
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Decision Output */}
                {result.decision && (
                  <div className="space-y-2">
                    <h5 className="font-medium flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      AI Decision
                    </h5>
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="text-sm">{result.decision.action}</Badge>
                        <div className="flex items-center gap-2 text-sm">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span>{result.decision.confidence}% confidence</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.decision.reasoning}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t mt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Evaluations run in isolated sandbox environment
          </div>
          <div className="flex gap-2">
            {result && (
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            )}
            <Button
              onClick={simulateEvaluation}
              disabled={!canRun || isRunning}
              className="gap-2"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run Evaluation
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
