import { NextRequest, NextResponse } from 'next/server';
import { predictWineQuality, WineFeatures } from '@/lib/wineModel';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const features: WineFeatures = {
      fixedAcidity: parseFloat(body.fixedAcidity) || 8.0,
      volatileAcidity: parseFloat(body.volatileAcidity) || 0.5,
      citricAcid: parseFloat(body.citricAcid) || 0.25,
      residualSugar: parseFloat(body.residualSugar) || 2.5,
      chlorides: parseFloat(body.chlorides) || 0.08,
      freeSulfurDioxide: parseFloat(body.freeSulfurDioxide) || 15.0,
      totalSulfurDioxide: parseFloat(body.totalSulfurDioxide) || 45.0,
      density: parseFloat(body.density) || 0.997,
      pH: parseFloat(body.pH) || 3.3,
      sulphates: parseFloat(body.sulphates) || 0.65,
      alcohol: parseFloat(body.alcohol) || 10.5,
    };

    const result = predictWineQuality(features);

    return NextResponse.json({
      success: true,
      prediction: result,
      input: features,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process prediction' },
      { status: 500 }
    );
  }
}
