import { getProjects } from "@/lib/portfolio";

export async function GET() {
  return Response.json({
    ok: true,
    service: "Rathee Intelligence Lab",
    phase: "landing-first-clean-foundation",
    projectCount: getProjects().length,
    timestamp: new Date().toISOString()
  });
}
