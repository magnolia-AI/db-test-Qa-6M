import { getEnvVars } from '@/app/actions/envs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default async function EnvPage() {
  const result = await getEnvVars();

  if (result.success === false) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive font-medium">{result.error}</p>
      </div>
    );
  }

  const envs = result.data;
  const envKeys = Object.keys(envs).sort();

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Environment Variables</h1>
        <p className="text-muted-foreground">
          A list of all environment variables currently set in the server runtime.
        </p>
      </div>

      <Card className="bg-card border-border shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Runtime Context</CardTitle>
          <CardDescription>
            Showing {envKeys.length} keys found in process.env
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[300px]">Variable Name</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {envKeys.map((key) => (
                  <TableRow key={key} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-sm font-semibold selection:bg-primary selection:text-primary-foreground">
                      {key}
                    </TableCell>
                    <TableCell className="font-mono text-xs break-all text-muted-foreground whitespace-pre-wrap">
                      {envs[key] ? (
                        <span className="text-foreground">{envs[key]}</span>
                      ) : (
                        <Badge variant="outline" className="text-[10px] uppercase font-bold opacity-50">empty</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

