export const dynamic = 'force-dynamic';

import { getEnquiries } from "@/lib/actions/enquiries";
import { EnquiriesTable } from "./EnquiriesTable";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Enquiries</h1>
        <p className="text-muted-foreground mt-1">
          Customer enquiries from the contact form
        </p>
      </div>

      <EnquiriesTable enquiries={JSON.parse(JSON.stringify(enquiries))} />
    </div>
  );
}
