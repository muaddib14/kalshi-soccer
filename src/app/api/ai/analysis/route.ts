// src/app/api/ai/analysis/route.ts
import { NextResponse } from 'next/server';
import { OpenRouterService } from '@/infrastructure/openrouter';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { matchId, homeTeam, awayTeam, league, homeForm, awayForm, h2h, homeAdvantage } = body;

    // Initialize your service
    const openRouter = new OpenRouterService();

    // Call the generation method
    // Note: We're mapping the incoming body to the expected matchData format
    const analysis = await openRouter.generateAIAnalysis({
      homeTeam,
      awayTeam,
      league,
      homeForm,
      awayForm,
      h2h,
      homeAdvantage
    });

    // Also fetch insights, risks, etc. in parallel if needed, 
    // or just return the main content for now
    const [keyInsights, riskFactors, playerRecommendations] = await Promise.all([
      openRouter.generateKeyInsights({ homeTeam, awayTeam, league }),
      openRouter.generateRiskFactors({ awayTeam }),
      openRouter.generatePlayerRecommendations({ homeTeam, awayTeam })
    ]);

    // Construct the full AIAnalysis object expected by your frontend type
    const response = {
      id: `analysis-${Date.now()}`,
      matchId,
      content: analysis,
      keyInsights,
      tacticalAnalysis: "Tactical analysis included in main content.", // Or extract specifically
      playerRecommendations,
      riskFactors,
      generatedAt: new Date(),
      model: 'anthropic/claude-3.5-sonnet'
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('AI Route Error:', error);
    return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 });
  }
}