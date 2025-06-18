import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit3, Trash2, Link as LinkIcon, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"; // Assuming use-toast hook exists

interface GeneratedPagePreviewCardProps {
  id: string;
  title: string;
  createdAt: string; // ISO string or formatted date string
  status?: 'draft' | 'published' | 'archived';
  viewUrl: string;
  editUrl: string;
  onDelete: (id: string) => void;
}

const GeneratedPagePreviewCard: React.FC<GeneratedPagePreviewCardProps> = ({
  id,
  title,
  createdAt,
  status,
  viewUrl,
  editUrl,
  onDelete,
}) => {
  console.log("Rendering GeneratedPagePreviewCard for page:", title, id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleView = () => {
    console.log("View page:", id, viewUrl);
    // window.open(viewUrl, '_blank'); // Open in new tab
    navigate(viewUrl);
  };

  const handleEdit = () => {
    console.log("Edit page:", id, editUrl);
    navigate(editUrl);
  };

  const handleDelete = () => {
    console.log("Delete page:", id);
    // Consider adding a confirmation dialog here before calling onDelete
    onDelete(id);
    toast({
      title: "Page Deletion Initiated",
      description: `Page "${title}" is being deleted.`,
    });
  };

  const handleCopyLink = () => {
    const fullViewUrl = `${window.location.origin}${viewUrl}`; // Construct full URL
    navigator.clipboard.writeText(fullViewUrl).then(() => {
      console.log("Link copied to clipboard:", fullViewUrl);
      toast({
        title: "Link Copied!",
        description: "Page URL copied to your clipboard.",
      });
    }).catch(err => {
      console.error("Failed to copy link:", err);
      toast({
        title: "Error",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      });
    });
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <Card className="w-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {status && (
            <Badge variant={status === 'published' ? 'default' : 'secondary'}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )}
        </div>
        <CardDescription>Created on: {formattedDate}</CardDescription>
      </CardHeader>
      {/* CardContent could hold a small preview/thumbnail if available */}
      {/* <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          A brief summary or the first few lines of the page content could go here...
        </p>
      </CardContent> */}
      <CardFooter className="flex flex-wrap gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={handleCopyLink}>
          <Copy className="mr-1 h-3.5 w-3.5" /> Copy Link
        </Button>
        <Button variant="outline" size="sm" onClick={handleView}>
          <Eye className="mr-1 h-3.5 w-3.5" /> View
        </Button>
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit3 className="mr-1 h-3.5 w-3.5" /> Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
export default GeneratedPagePreviewCard;