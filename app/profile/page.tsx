import { getContent } from "@/lib/content";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import ProfileView from "@/components/ProfileView";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const content = await getContent();
  return (
    <SiteContentProvider value={content}>
      <ProfileView />
    </SiteContentProvider>
  );
}
