import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'data', 'experiences.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const experiences = JSON.parse(fileContent);
    
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error reading experiences:', error);
    return NextResponse.json({ error: 'Error loading experiences' }, { status: 500 });
  }
}
